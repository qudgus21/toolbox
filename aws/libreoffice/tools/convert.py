import os
import subprocess

# LibreOffice 변환 포맷 매핑
TOOL_FORMAT_MAP = {
    # Office → PDF
    "word-to-pdf": "pdf",
    "excel-to-pdf": "pdf",
    "ppt-to-pdf": "pdf",
    # PDF → Office
    "pdf-to-word": "docx",
    "pdf-to-excel": "xlsx",
    "pdf-to-ppt": "pptx",
}

TOOL_EXT_MAP = {
    "word-to-pdf": ".pdf",
    "excel-to-pdf": ".pdf",
    "ppt-to-pdf": ".pdf",
    "pdf-to-word": ".docx",
    "pdf-to-excel": ".xlsx",
    "pdf-to-ppt": ".pptx",
}


def _clean_libreoffice_profile():
    """Lambda 재사용 시 잠긴 프로파일 제거 — LibreOffice가 조용히 실패하는 원인."""
    import glob
    import shutil

    for pattern in ["/tmp/.~lock.*", "/tmp/lu*"]:
        for path in glob.glob(pattern):
            try:
                os.remove(path) if os.path.isfile(path) else shutil.rmtree(path)
            except OSError:
                pass

    profile_dir = "/tmp/libreoffice-profile"
    if os.path.exists(profile_dir):
        shutil.rmtree(profile_dir, ignore_errors=True)


def handle(tool: str, input_path: str, options: dict) -> tuple[str, str]:
    output_format = TOOL_FORMAT_MAP.get(tool)
    if not output_format:
        raise ValueError(f"Unknown tool: {tool}")

    output_dir = "/tmp/lo-output"
    # 이전 실행 잔여물 정리
    if os.path.exists(output_dir):
        import shutil
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)

    # LibreOffice 프로파일 잠금 제거
    _clean_libreoffice_profile()

    # 전용 사용자 프로파일로 동시성/잠금 문제 방지
    user_profile = "/tmp/libreoffice-profile"
    os.makedirs(user_profile, exist_ok=True)

    # LibreOffice headless 변환
    cmd = [
        "libreoffice",
        f"-env:UserInstallation=file://{user_profile}",
        "--headless",
        "--norestore",
        "--convert-to", output_format,
        "--outdir", output_dir,
        input_path,
    ]

    env = os.environ.copy()
    env["HOME"] = "/tmp"

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=240,
        env=env,
    )

    if result.returncode != 0:
        raise RuntimeError(
            f"LibreOffice conversion failed (rc={result.returncode}): "
            f"stderr={result.stderr}, stdout={result.stdout}"
        )

    # 출력 파일 찾기
    basename = os.path.splitext(os.path.basename(input_path))[0]
    expected_ext = TOOL_EXT_MAP[tool]
    output_path = os.path.join(output_dir, f"{basename}{expected_ext}")

    if not os.path.exists(output_path):
        # LibreOffice가 다른 이름으로 생성했을 수 있음
        for f in os.listdir(output_dir):
            if f.endswith(expected_ext):
                output_path = os.path.join(output_dir, f)
                break
        else:
            files = os.listdir(output_dir)
            raise RuntimeError(
                f"Output file not found. Dir contents: {files}. "
                f"stdout={result.stdout}, stderr={result.stderr}"
            )

    output_filename = f"{basename}{expected_ext}"
    return output_path, output_filename
