FROM python:3.9-alpine
ENV PYTHONNUMBUFFERED 1

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["/bin/sh", "start.sh"]
