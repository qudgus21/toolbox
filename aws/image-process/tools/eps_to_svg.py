import os
import subprocess


def handle(input_path: str, options: dict) -> tuple[str, str]:
    basename = os.path.splitext(os.path.basename(input_path))[0]
    output_path = f"/tmp/{basename}.svg"

    # Ghostscript로 EPS → PDF → Inkscape/potrace가 아닌,
    # Ghostscript의 svg 디바이스로 직접 변환
    # 또는 eps2eps → cairo로 변환
    # 가장 간단: Ghostscript eps2write → svg 변환은 직접 지원 안 하므로
    # EPS → PNG → potrace → SVG 체인 사용
    png_path = f"/tmp/{basename}-temp.png"

    # Step 1: EPS → PNG (고해상도)
    cmd_gs = [
        "convert",
        "-density", "300",
        input_path,
        png_path,
    ]
    result = subprocess.run(cmd_gs, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise RuntimeError(f"EPS to PNG failed: {result.stderr}")

    # Step 2: PNG → BMP (potrace 입력용)
    bmp_path = f"/tmp/{basename}-temp.bmp"
    cmd_bmp = ["convert", png_path, bmp_path]
    result = subprocess.run(cmd_bmp, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        raise RuntimeError(f"PNG to BMP failed: {result.stderr}")

    # Step 3: potrace BMP → SVG
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
        raise RuntimeError("EPS to SVG conversion produced empty output")

    # 정리
    for tmp in [png_path, bmp_path]:
        if os.path.exists(tmp):
            os.remove(tmp)

    return output_path, f"{basename}.svg"
