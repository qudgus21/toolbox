import os
import subprocess
import shutil


def _magick() -> str:
    return "magick" if shutil.which("magick") else "convert"


def handle(tool: str, input_path: str, options: dict) -> tuple[str, str]:
    """PNG/JPG → SVG 벡터 변환 (potrace 기반)."""
    basename = os.path.splitext(os.path.basename(input_path))[0]
    output_path = f"/tmp/{basename}.svg"

    # potrace는 BMP 입력만 받으므로 먼저 변환
    bmp_path = f"/tmp/{basename}-temp.bmp"

    cmd_bmp = [_magick(), input_path, bmp_path]
    result = subprocess.run(cmd_bmp, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        raise RuntimeError(f"Image to BMP failed: {result.stderr}")

    # potrace BMP → SVG
    cmd_potrace = [
        "potrace",
        bmp_path,
        "-s",  # SVG output
        "-o", output_path,
    ]
    result = subprocess.run(cmd_potrace, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        raise RuntimeError(f"Potrace failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("Raster to SVG conversion produced empty output")

    if os.path.exists(bmp_path):
        os.remove(bmp_path)

    return output_path, f"{basename}.svg"
