import os
import subprocess


def handle(input_path: str, options: dict) -> tuple[str, str]:
    """이미지에서 텍스트 추출 (Tesseract OCR)."""
    language = options.get("language", "eng")
    basename = os.path.splitext(os.path.basename(input_path))[0]
    output_base = f"/tmp/{basename}-ocr"

    cmd = [
        "tesseract",
        input_path,
        output_base,
        "-l", language,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise RuntimeError(f"Tesseract OCR failed: {result.stderr}")

    output_path = f"{output_base}.txt"
    if not os.path.exists(output_path):
        raise RuntimeError("OCR produced no output file")

    return output_path, f"{basename}-ocr.txt"
