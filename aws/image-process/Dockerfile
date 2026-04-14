FROM fedora:39

# 이미지 처리 도구 + Python 설치
RUN dnf install -y --setopt=install_weak_deps=False \
    python3.12 python3-pip \
    ImageMagick ghostscript potrace \
    tesseract tesseract-langpack-eng tesseract-langpack-kor \
    libheif-tools tar xz \
    && dnf clean all

# FFmpeg (static binary)
RUN curl -sL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz \
    | tar xJ --strip-components=1 -C /usr/local/bin/ --wildcards '*/ffmpeg' '*/ffprobe'

# Lambda Runtime Interface Client
RUN pip3 install --no-cache-dir awslambdaric

WORKDIR /var/task
COPY shared/ /var/task/shared/
COPY image-process/handler.py /var/task/
COPY image-process/tools/ /var/task/tools/

ENTRYPOINT ["python3", "-m", "awslambdaric"]
CMD ["handler.handler"]
