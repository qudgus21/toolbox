FROM public.ecr.aws/lambda/python:3.12

# ImageMagick + Ghostscript (EPS 변환용) + potrace
RUN dnf install -y ImageMagick ghostscript potrace && dnf clean all

# Tesseract: EPEL 9에서 설치
RUN dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm && \
    dnf install -y tesseract tesseract-langpack-eng tesseract-langpack-kor && \
    dnf clean all

# HEIC 지원: libheif-tools
RUN dnf install -y libheif-tools 2>/dev/null || true && dnf clean all

# FFmpeg (static binary)
RUN curl -sL https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz \
    | tar xJ --strip-components=1 -C /usr/local/bin/ --wildcards '*/ffmpeg' '*/ffprobe'

COPY shared/ ${LAMBDA_TASK_ROOT}/shared/
COPY image-process/handler.py ${LAMBDA_TASK_ROOT}/
COPY image-process/tools/ ${LAMBDA_TASK_ROOT}/tools/

CMD ["handler.handler"]
