import os
import subprocess


def handle(input_path: str, options: dict) -> tuple[str, str]:
    output_path = "/tmp/repaired.pdf"

    # 먼저 qpdf로 시도 (구조 복구에 강함)
    cmd_qpdf = [
        "qpdf",
        "--replace-input",
        input_path,
    ]

    # qpdf --replace-input 은 원본을 수정하므로 먼저 복사
    import shutil
    shutil.copy2(input_path, output_path)

    cmd_qpdf = ["qpdf", output_path, "--replace-input"]
    result = subprocess.run(cmd_qpdf, capture_output=True, text=True, timeout=120)

    if result.returncode not in (0, 3):
        # qpdf 실패 시 Ghostscript로 fallback
        cmd_gs = [
            "gs",
            "-o", output_path,
            "-sDEVICE=pdfwrite",
            "-dNOPAUSE",
            "-dBATCH",
            "-dQUIET",
            input_path,
        ]
        result = subprocess.run(cmd_gs, capture_output=True, text=True, timeout=240)
        if result.returncode != 0:
            raise RuntimeError(f"PDF repair failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("Repair produced empty output")

    basename = os.path.splitext(os.path.basename(input_path))[0]
    return output_path, f"{basename}-repaired.pdf"
