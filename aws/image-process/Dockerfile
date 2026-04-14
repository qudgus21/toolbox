FROM amazonlinux:2023

# Python 3.12 + 기본 이미지 도구 설치
RUN dnf install -y python3.12 python3.12-pip ImageMagick ghostscript tar xz && dnf clean all

# EPEL 활성화 후 Tesseract + potrace 설치
RUN dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm && \
    dnf install -y tesseract tesseract-langpack-eng tesseract-langpack-kor potrace && \
    dnf clean all

# HEIC 지원
RUN dnf install -y libheif-tools 2>/dev/null || true && dnf clean all

# FFmpeg (static binary)
RUN curl -sL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz \
    | tar xJ --strip-components=1 -C /usr/local/bin/ --wildcards '*/ffmpeg' '*/ffprobe'

# Lambda Runtime Interface Client
RUN pip3.12 install --no-cache-dir awslambdaric

WORKDIR /var/task
COPY shared/ /var/task/shared/
COPY image-process/handler.py /var/task/
COPY image-process/tools/ /var/task/tools/

ENTRYPOINT ["python3.12", "-m", "awslambdaric"]
CMD ["handler.handler"]
