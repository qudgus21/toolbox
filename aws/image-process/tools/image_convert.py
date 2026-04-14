import os
import subprocess
import shutil

# ImageMagick magick 명령으로 처리 가능한 포맷 변환 매핑
TOOL_CONFIG = {
    "heic-to-jpg": {"output_ext": ".jpg", "extra_args": ["-quality", "95"]},
    "heic-to-png": {"output_ext": ".png"},
    "tiff-to-jpg": {"output_ext": ".jpg", "extra_args": ["-quality", "95"]},
    "tiff-to-png": {"output_ext": ".png"},
    "psd-to-jpg": {"output_ext": ".jpg",  "extra_args": ["-flatten", "-quality", "95"]},
    "psd-to-png": {"output_ext": ".png",  "extra_args": ["-flatten"]},
    "eps-to-jpg": {"output_ext": ".jpg",  "extra_args": ["-density", "300", "-quality", "95"]},
    "eps-to-png": {"output_ext": ".png",  "extra_args": ["-density", "300"]},
}


def _heic_convert(input_path: str, output_ext: str, quality: int) -> str:
    """pillow-heif로 HEIC -> JPG/PNG 변환 (HEVC 코덱 내장)"""
    from pillow_heif import register_heif_opener
    from PIL import Image

    register_heif_opener()

    basename = os.path.splitext(os.path.basename(input_path))[0]
    output_path = f"/tmp/{basename}{output_ext}"

    img = Image.open(input_path)
    # HEIC는 RGBA일 수 있으므로 JPG 저장 시 RGB 변환
    if output_ext == ".jpg" and img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    save_kwargs = {"quality": quality} if output_ext == ".jpg" else {}
    img.save(output_path, **save_kwargs)
    img.close()

    return output_path


def _get_magick_cmd() -> str:
    """ImageMagick v7은 magick, v6은 convert"""
    if shutil.which("magick"):
        return "magick"
    return "convert"


def handle(tool: str, input_path: str, options: dict) -> tuple[str, str]:
    config = TOOL_CONFIG.get(tool)
    if not config:
        raise ValueError(f"Unknown tool for image_convert: {tool}")

    output_ext = config["output_ext"]
    extra_args = config.get("extra_args", [])
    basename = os.path.splitext(os.path.basename(input_path))[0]
    output_path = f"/tmp/{basename}{output_ext}"

    # HEIC/HEIF: pillow-heif 사용 (시스템 libheif에 HEVC 코덱 없음)
    if tool.startswith("heic-"):
        quality = 95 if output_ext == ".jpg" else 100
        output_path = _heic_convert(input_path, output_ext, quality)
        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            raise RuntimeError("HEIC conversion produced empty output")
        return output_path, f"{basename}{output_ext}"

    # ImageMagick (v7: magick, v6: convert)
    # PSD: [0]으로 첫 번째 레이어(합성) 가져오기
    src = input_path
    if tool.startswith("psd-"):
        src = f"{input_path}[0]"

    magick = _get_magick_cmd()
    cmd = [magick, src] + extra_args + [output_path]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise RuntimeError(f"ImageMagick conversion failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("Conversion produced empty output")

    return output_path, f"{basename}{output_ext}"
