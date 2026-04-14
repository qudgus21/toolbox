FROM amazonlinux:2023

# Python 3.12 + 시스템 패키지 설치
RUN dnf install -y python3.12 python3.12-pip ghostscript qpdf && dnf clean all

# Tesseract: EPEL 9에서 설치
RUN dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm && \
    dnf install -y tesseract tesseract-langpack-eng tesseract-langpack-kor \
    tesseract-langpack-jpn tesseract-langpack-chi_sim && \
    dnf clean all

# Lambda Runtime Interface Client
RUN pip3.12 install --no-cache-dir awslambdaric

WORKDIR /var/task
COPY shared/ /var/task/shared/
COPY pdf-process/handler.py /var/task/
COPY pdf-process/tools/ /var/task/tools/

ENTRYPOINT ["python3.12", "-m", "awslambdaric"]
CMD ["handler.handler"]
