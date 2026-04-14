import os
import subprocess


def handle(input_path: str, options: dict) -> tuple[str, str]:
    basename = os.path.splitext(os.path.basename(input_path))[0]
    output_path = f"/tmp/{basename}.mp4"

    cmd = [
        "ffmpeg",
        "-y",
        "-i", input_path,
        "-movflags", "faststart",
        "-pix_fmt", "yuv420p",
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        output_path,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg conversion failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("GIF to MP4 conversion produced empty output")

    return output_path, f"{basename}.mp4"
