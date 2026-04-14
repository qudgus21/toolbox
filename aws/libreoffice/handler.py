import json
import os
import sys
import base64

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from shared.s3_utils import cleanup_tmp
from shared.response import success, error, options_response

from tools.convert import handle as convert_handle, TOOL_FORMAT_MAP

SUPPORTED_TOOLS = set(TOOL_FORMAT_MAP.keys())
MAX_FILE_SIZE = 20 * 1024 * 1024

CONTENT_TYPE_MAP = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
}


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

        ext = os.path.splitext(filename)[1] or ".pdf"
        input_path = f"/tmp/input{ext}"
        with open(input_path, "wb") as f:
            f.write(file_bytes)

        output_path, output_filename = convert_handle(tool, input_path, options)

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
