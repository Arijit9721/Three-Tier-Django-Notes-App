# ----------------------- 1st Stage Build ----------------------------------------
FROM python:3.9  as Builder

WORKDIR /app

RUN apt-get update \
&& apt-get upgrade -y \
&& apt-get install -y gcc default-libmysqlclient-dev pkg-config \
&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ------------------------- Final Build --------------------------------------------
FROM python:3.9-slim

WORKDIR /app

COPY --from=Builder /usr/local/lib/python3.9/site-packages/ /usr/local/lib/python3.9/site-packages/

COPY Backend/ Backend/
COPY APIs/ APIs/
COPY manage.py .

EXPOSE 8000