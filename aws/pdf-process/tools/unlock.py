import os
import subprocess


def handle(input_path: str, options: dict) -> tuple[str, str]:
    password = options.get("password", "")
    output_path = "/tmp/unlocked.pdf"

    cmd = ["qpdf", "--decrypt"]
    if password:
        cmd += [f"--password={password}"]
    cmd += [input_path, output_path]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        stderr = result.stderr.lower()
        if "password" in stderr:
            raise RuntimeError("Invalid password")
        raise RuntimeError(f"Unlock failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("Unlock produced empty output")

    basename = os.path.splitext(os.path.basename(input_path))[0]
    return output_path, f"{basename}-unlocked.pdf"
