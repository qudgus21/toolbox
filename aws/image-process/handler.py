import json
import os
import sys
import base64

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from shared.s3_utils import cleanup_tmp
from shared.response import success, error, options_response

from tools.image_convert import handle as image_convert_handle, TOOL_CONFIG as CONVERT_TOOLS
from tools.eps_to_svg import handle as eps_to_svg_handle
from tools.raster_to_svg import handle as raster_to_svg_handle
from tools.gif_to_mp4 import handle as gif_to_mp4_handle
from tools.image_ocr import handle as image_ocr_handle

SPECIAL_HANDLERS = {
    "eps-to-svg": eps_to_svg_handle,
    "gif-to-mp4": gif_to_mp4_handle,
    "image-to-text": image_ocr_handle,
}
RASTER_SVG_TOOLS = {"png-to-svg", "jpg-to-svg"}
SUPPORTED_TOOLS = set(CONVERT_TOOLS.keys()) | set(SPECIAL_HANDLERS.keys()) | RASTER_SVG_TOOLS

MAX_FILE_SIZE = 20 * 1024 * 1024


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")
    if method == "OPTIONS":
        return options_response()

    try:
        body = json.loads(event.get("body", "{}"))
    except (json.JSONDecodeError, TypeError):
        return error("Invalid JSON body")

    tool = body.get("tool", "")
    file_data = body.get("file", "")
    filename = body.get("filename", "input")
    options = body.get("options", {})

    if not tool or not file_data:
        return error("Missing required fields: tool, file")

    if tool not in SUPPORTED_TOOLS:
        return error(f"Unknown tool: {tool}", 400)

    try:
        file_bytes = base64.b64decode(file_data)
        if len(file_bytes) > MAX_FILE_SIZE:
            return error("File too large (max 20MB)")

        ext = os.path.splitext(filename)[1] or ".bin"
        input_path = f"/tmp/input{ext}"
        with open(input_path, "wb") as f:
            f.write(file_bytes)

        if tool in CONVERT_TOOLS:
            output_path, output_filename = image_convert_handle(tool, input_path, options)
        elif tool in RASTER_SVG_TOOLS:
            output_path, output_filename = raster_to_svg_handle(tool, input_path, options)
        elif tool in SPECIAL_HANDLERS:
            output_path, output_filename = SPECIAL_HANDLERS[tool](input_path, options)
        else:
            return error(f"No handler for tool: {tool}", 500)

        with open(output_path, "rb") as f:
            result_bytes = f.read()

        result_b64 = base64.b64encode(result_bytes).decode("utf-8")
        output_size = len(result_bytes)

        cleanup_tmp()

        return success({
            "file": result_b64,
            "filename": output_filename,
            "size": output_size,
        })

    except Exception as e:
        cleanup_tmp()
        return error(f"Processing failed: {str(e)}", 500)
