# Project 2
# Mohini Salunke
# Red ID: 822049248
# Docker File for Nginx

FROM alpine:3.8

LABEL maintainer 'Mohini Salunke <mohinims22@gmail.com>'
LABEL description 'Nginx + uWSGI + Flask based on Alpine linux and managed by supervisord'

# COPY python requirements file
COPY ./nginx/requirements.txt /tmp/requirements.txt

RUN apk add --no-cache \
	python3 \
	python3-dev \
	bash \
	nginx \
	uwsgi-python3 \
	supervisor && \
	python3 -m ensurepip && \
	rm -r /usr/lib/python*/ensurepip && \
	pip3 install --upgrade pip setuptools && \
	pip3 install -r /tmp/requirements.txt && \
	rm /etc/nginx/conf.d/default.conf && \
	rm -r /root/.cache

# Copy the Nginx global conf
COPY ./nginx/nginx.conf /etc/nginx/

# Copy the Flask Nginx site conf
COPY ./nginx/nginx_site_flask.conf /etc/nginx/conf.d/

# Copy the base uWSGI ini file to enable default dynamic uwsgi
COPY ./nginx/uwsgi.ini /etc/uwsgi/

# Custom Supervisord config
COPY ./nginx/supervisord.conf /etc/supervisord.conf

# Add the app
COPY ./assignment2 /assignment2
WORKDIR /assignment2

CMD ["/usr/bin/supervisord"]