FROM python:3.13

RUN apt-get update && apt-get install -y curl

RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["/bin/sh", "-c", "wait-for-it database:5432 -- python3 run.py"]
