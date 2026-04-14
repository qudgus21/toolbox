FROM amazonlinux:2023

# Python 3.12 설치
RUN dnf install -y python3.12 python3.12-pip && dnf clean all

# EPEL 활성화 후 LibreOffice headless 설치
RUN dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm && \
    dnf install -y libreoffice-core libreoffice-calc libreoffice-writer libreoffice-impress && \
    dnf clean all

# CJK 폰트
RUN dnf install -y google-noto-sans-cjk-ttc-fonts 2>/dev/null || \
    dnf install -y google-noto-fonts-common 2>/dev/null || true && \
    dnf clean all

# Lambda Runtime Interface Client
RUN pip3.12 install --no-cache-dir awslambdaric

WORKDIR /var/task
COPY shared/ /var/task/shared/
COPY libreoffice/handler.py /var/task/
COPY libreoffice/tools/ /var/task/tools/

ENTRYPOINT ["python3.12", "-m", "awslambdaric"]
CMD ["handler.handler"]
