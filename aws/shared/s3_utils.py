import os


def cleanup_tmp() -> None:
    """Lambda /tmp 디렉토리 정리."""
    tmp = "/tmp"
    for f in os.listdir(tmp):
        path = os.path.join(tmp, f)
        if os.path.isfile(path):
            try:
                os.remove(path)
            except OSError:
                pass
