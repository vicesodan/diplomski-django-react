FROM python:3
RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-transport-https \
    unixodbc-dev \
    unixodbc \
    libpq-dev 

RUN apt -y install curl
RUN apt -y install gnupg2
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list


WORKDIR /myproject
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD ["python3", "myproject/manage.py", "runserver", "0.0.0.0:8000"]