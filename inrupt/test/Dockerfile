FROM docker.io/library/httpd:2.4

LABEL maintainer david.bowen@inrupt.com

# Enable the rewrite module
RUN sed -i '/LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf

# Stop the log message about server name distracting us
RUN echo "ServerName inrupt_httpd" >> /usr/local/apache2/conf/httpd.conf

# Use debug because this service is run to diagnose problems
RUN sed -i "/LogLevel/s/warn/debug/" /usr/local/apache2/conf/httpd.conf

# This is needed to allow our local .htaccess file to override the configuration
# Of course you wouldn't do this care-free replace on a live server's config
RUN sed -i "/AllowOverride/s/None/All/" /usr/local/apache2/conf/httpd.conf
