FROM fedora:39 AS build

# Ghostscript + qpdf + Tesseract 설치
RUN dnf install -y --setopt=install_weak_deps=False \
    python3.12 python3-pip \
    ghostscript qpdf \
    tesseract tesseract-langpack-eng tesseract-langpack-kor \
    tesseract-langpack-jpn tesseract-langpack-chi_sim \
    && dnf clean all

# Lambda Runtime Interface Client
RUN pip3 install --no-cache-dir awslambdaric

WORKDIR /var/task
COPY shared/ /var/task/shared/
COPY pdf-process/handler.py /var/task/
COPY pdf-process/tools/ /var/task/tools/

ENTRYPOINT ["python3", "-m", "awslambdaric"]
CMD ["handler.handler"]
