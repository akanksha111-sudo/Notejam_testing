FROM python:3

ENV PYTHONUNBUFFERED 1

ENV APP_HOME app

COPY notejam app

WORKDIR $APP_HOME

COPY requirements.txt .

EXPOSE 8000

RUN pip install -r requirements.txt

CMD [ "python","manage.py","runserver","0.0.0.0:8000" ]
