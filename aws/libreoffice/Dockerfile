FROM public.ecr.aws/lambda/python:3.12

# LibreOffice headless + CJK 폰트 설치
RUN dnf install -y \
    libreoffice-core libreoffice-calc libreoffice-writer libreoffice-impress \
    && dnf clean all

# CJK 폰트 (google-noto-sans-cjk 없으면 대안 사용)
RUN dnf install -y google-noto-sans-cjk-ttc-fonts 2>/dev/null || \
    dnf install -y google-noto-sans-fonts 2>/dev/null || true && \
    dnf clean all

COPY shared/ ${LAMBDA_TASK_ROOT}/shared/
COPY libreoffice/handler.py ${LAMBDA_TASK_ROOT}/
COPY libreoffice/tools/ ${LAMBDA_TASK_ROOT}/tools/

CMD ["handler.handler"]
