FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install nano -y
RUN apt-get install apache2 -y

RUN a2enmod rewrite

RUN mkdir -p /var/www/html/tern/
COPY .htaccess /var/www/html/tern/.htaccess
COPY apache2.conf /etc/apache2/apache2.conf

CMD service apache2 start && /bin/bash