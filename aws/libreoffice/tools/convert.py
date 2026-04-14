import os
import subprocess

# LibreOffice 변환 포맷 매핑
TOOL_FORMAT_MAP = {
    # Office → PDF
    "word-to-pdf": "pdf",
    "excel-to-pdf": "pdf",
    "ppt-to-pdf": "pdf",
    # PDF → Office
    "pdf-to-word": "docx",
    "pdf-to-excel": "xlsx",
    "pdf-to-ppt": "pptx",
}

TOOL_EXT_MAP = {
    "word-to-pdf": ".pdf",
    "excel-to-pdf": ".pdf",
    "ppt-to-pdf": ".pdf",
    "pdf-to-word": ".docx",
    "pdf-to-excel": ".xlsx",
    "pdf-to-ppt": ".pptx",
}


def handle(tool: str, input_path: str, options: dict) -> tuple[str, str]:
    output_format = TOOL_FORMAT_MAP.get(tool)
    if not output_format:
        raise ValueError(f"Unknown tool: {tool}")

    output_dir = "/tmp/lo-output"
    os.makedirs(output_dir, exist_ok=True)

    # LibreOffice headless 변환
    cmd = [
        "libreoffice",
        "--headless",
        "--norestore",
        "--convert-to", output_format,
        "--outdir", output_dir,
        input_path,
    ]

    env = os.environ.copy()
    env["HOME"] = "/tmp"

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=240,
        env=env,
    )

    if result.returncode != 0:
        raise RuntimeError(f"LibreOffice conversion failed: {result.stderr}")

    # 출력 파일 찾기
    basename = os.path.splitext(os.path.basename(input_path))[0]
    expected_ext = TOOL_EXT_MAP[tool]
    output_path = os.path.join(output_dir, f"{basename}{expected_ext}")

    if not os.path.exists(output_path):
        # LibreOffice가 다른 이름으로 생성했을 수 있음
        for f in os.listdir(output_dir):
            if f.endswith(expected_ext):
                output_path = os.path.join(output_dir, f)
                break
        else:
            files = os.listdir(output_dir)
            raise RuntimeError(f"Output file not found. Dir contents: {files}")

    output_filename = f"{basename}{expected_ext}"
    return output_path, output_filename
