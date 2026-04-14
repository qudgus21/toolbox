FROM fedora:39

# LibreOffice headless + Python 설치
RUN dnf install -y --setopt=install_weak_deps=False \
    python3.12 python3-pip \
    libreoffice-core libreoffice-calc libreoffice-writer libreoffice-impress \
    libreoffice-filters libreoffice-pdfimport \
    google-noto-sans-cjk-ttc-fonts \
    && dnf clean all

# Lambda Runtime Interface Client
RUN pip3 install --no-cache-dir awslambdaric

WORKDIR /var/task
COPY shared/ /var/task/shared/
COPY libreoffice/handler.py /var/task/
COPY libreoffice/tools/ /var/task/tools/

ENTRYPOINT ["python3", "-m", "awslambdaric"]
CMD ["handler.handler"]
