import os
import subprocess


def handle(input_path: str, options: dict) -> tuple[str, str]:
    output_path = "/tmp/output-pdfa.pdf"

    # Ghostscript로 PDF/A-2b 변환
    cmd = [
        "gs",
        "-dPDFA=2",
        "-dBATCH",
        "-dNOPAUSE",
        "-dQUIET",
        "-sColorConversionStrategy=UseDeviceIndependentColor",
        "-sDEVICE=pdfwrite",
        "-dPDFACompatibilityPolicy=1",
        f"-sOutputFile={output_path}",
        input_path,
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=240)
    if result.returncode != 0:
        raise RuntimeError(f"PDF/A conversion failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("PDF/A conversion produced empty output")

    basename = os.path.splitext(os.path.basename(input_path))[0]
    return output_path, f"{basename}-pdfa.pdf"
