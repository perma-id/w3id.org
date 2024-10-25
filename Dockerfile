FROM httpd:2.4
COPY ./drk /usr/local/apache2/htdocs/drk
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf
