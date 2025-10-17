FROM python:3.12-alpine


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./src /code/src

CMD ["fastapi", "run",  "src/main.py", "--port", "8080", "--proxy-headers"]
#CMD ["fastapi", "run", "src/main.py", "--port", "8080"]