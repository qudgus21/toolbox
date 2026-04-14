import os
import subprocess

# Ghostscript PDFSETTINGS 옵션별 설명:
# /screen   — 72 dpi (최소 크기, 화면 전용)
# /ebook    — 150 dpi (중간 품질)
# /printer  — 300 dpi (인쇄 품질)
# /prepress — 300 dpi (최고 품질, 색상 보존)

QUALITY_MAP = {
    "low": "/screen",
    "medium": "/ebook",
    "high": "/printer",
}


def handle(input_path: str, options: dict) -> tuple[str, str]:
    quality = options.get("quality", "medium")
    pdf_settings = QUALITY_MAP.get(quality, "/ebook")

    output_path = "/tmp/compressed.pdf"

    cmd = [
        "gs",
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        f"-dPDFSETTINGS={pdf_settings}",
        "-dNOPAUSE",
        "-dBATCH",
        "-dQUIET",
        f"-sOutputFile={output_path}",
        input_path,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=240)
    if result.returncode != 0:
        raise RuntimeError(f"Ghostscript compress failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("Compression produced empty output")

    # 압축 결과가 원본보다 크면 원본을 그대로 반환
    original_size = os.path.getsize(input_path)
    compressed_size = os.path.getsize(output_path)
    if compressed_size >= original_size:
        import shutil
        shutil.copy2(input_path, output_path)

    basename = os.path.splitext(os.path.basename(input_path))[0]
    return output_path, f"{basename}-compressed.pdf"
