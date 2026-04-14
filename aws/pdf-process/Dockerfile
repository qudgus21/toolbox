FROM public.ecr.aws/lambda/python:3.12

# Ghostscript + qpdf 설치 (기본 repos에서 사용 가능)
RUN dnf install -y ghostscript qpdf && dnf clean all

# Tesseract: EPEL 9 저장소에서 설치 (Amazon Linux 2023 = RHEL 9 기반)
RUN dnf install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm && \
    dnf install -y tesseract tesseract-langpack-eng tesseract-langpack-kor \
    tesseract-langpack-jpn tesseract-langpack-chi_sim && \
    dnf clean all

COPY shared/ ${LAMBDA_TASK_ROOT}/shared/
COPY pdf-process/handler.py ${LAMBDA_TASK_ROOT}/
COPY pdf-process/tools/ ${LAMBDA_TASK_ROOT}/tools/

CMD ["handler.handler"]
