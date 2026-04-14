import os
import subprocess
import glob as glob_mod


def handle(input_path: str, options: dict) -> tuple[str, str]:
    language = options.get("language", "eng")
    output_path = "/tmp/ocr-output.pdf"

    # 1) PDF → 이미지 변환 (Ghostscript)
    img_prefix = "/tmp/page"
    cmd_gs = [
        "gs",
        "-dNOPAUSE",
        "-dBATCH",
        "-dQUIET",
        "-sDEVICE=png16m",
        "-r300",
        f"-sOutputFile={img_prefix}-%04d.png",
        input_path,
    ]
    result = subprocess.run(cmd_gs, capture_output=True, text=True, timeout=240)
    if result.returncode != 0:
        raise RuntimeError(f"PDF to image conversion failed: {result.stderr}")

    # 2) 각 이미지에 Tesseract OCR 적용 → 개별 PDF
    page_images = sorted(glob_mod.glob(f"{img_prefix}-*.png"))
    if not page_images:
        raise RuntimeError("No pages extracted from PDF")

    page_pdfs = []
    for i, img_path in enumerate(page_images):
        page_out = f"/tmp/ocr-page-{i:04d}"
        cmd_tess = [
            "tesseract",
            img_path,
            page_out,
            "-l", language,
            "pdf",
        ]
        result = subprocess.run(cmd_tess, capture_output=True, text=True, timeout=120)
        if result.returncode != 0:
            raise RuntimeError(f"OCR failed on page {i+1}: {result.stderr}")
        page_pdfs.append(f"{page_out}.pdf")

    # 3) 개별 PDF 병합 (qpdf)
    if len(page_pdfs) == 1:
        import shutil
        shutil.copy2(page_pdfs[0], output_path)
    else:
        cmd_merge = ["qpdf", "--empty", "--pages"] + page_pdfs + ["--", output_path]
        result = subprocess.run(cmd_merge, capture_output=True, text=True, timeout=120)
        if result.returncode != 0:
            raise RuntimeError(f"PDF merge failed: {result.stderr}")

    if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
        raise RuntimeError("OCR produced empty output")

    basename = os.path.splitext(os.path.basename(input_path))[0]
    return output_path, f"{basename}-ocr.pdf"
