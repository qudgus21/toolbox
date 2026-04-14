import json
import os
import sys
import base64

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from shared.s3_utils import cleanup_tmp
from shared.response import success, error, options_response

from tools.compress import handle as compress_handle
from tools.pdf_to_pdfa import handle as pdf_to_pdfa_handle
from tools.repair import handle as repair_handle
from tools.unlock import handle as unlock_handle
from tools.ocr import handle as ocr_handle

TOOL_HANDLERS = {
    "compress": compress_handle,
    "pdf-to-pdfa": pdf_to_pdfa_handle,
    "repair": repair_handle,
    "unlock": unlock_handle,
    "ocr": ocr_handle,
}

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20MB


def handler(event, context):
    method = event.get("requestContext", {}).get("http", {}).get("method", "")
    if method == "OPTIONS":
        return options_response()

    try:
        body = json.loads(event.get("body", "{}"))
    except (json.JSONDecodeError, TypeError):
        return error("Invalid JSON body")

    tool = body.get("tool", "")
    file_data = body.get("file", "")  # base64 encoded
    filename = body.get("filename", "input.pdf")
    options = body.get("options", {})

    if not tool or not file_data:
        return error("Missing required fields: tool, file")

    handler_fn = TOOL_HANDLERS.get(tool)
    if not handler_fn:
        return error(f"Unknown tool: {tool}", 400)

    try:
        # base64 디코딩 → /tmp에 저장
        file_bytes = base64.b64decode(file_data)
        if len(file_bytes) > MAX_FILE_SIZE:
            return error("File too large (max 20MB)")

        ext = os.path.splitext(filename)[1] or ".pdf"
        input_path = f"/tmp/input{ext}"
        with open(input_path, "wb") as f:
            f.write(file_bytes)

        # 도구별 처리
        output_path, output_filename = handler_fn(input_path, options)

        # 결과를 base64로 인코딩하여 반환
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
