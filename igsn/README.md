# IGSN

The IGSN (International Generic Sample Number, formerly the International Geo Sample Number) is a persistent unique identifier for physical samples and specimens that eliminates the problems associated with the ambiguous naming of samples.

## Project Home

* https://igsn.org
* https://igsn.github.io/

## Contacts

* https://github.com/igsn

## Development and Testing

Use the [Apache .htaccess Tester](https://github.com/chaseconey/htaccess-tester)

In the parent of this folder (i.e. root of a checkout of https://github.com/perma-id/w3id.org.git):

1. Fire up docker:

```
cd w3id.org
docker run -p 6080:80 -v "$PWD:/usr/local/apache2/htdocs" chaseconey/htaccess-tester
```

2. Evaluate some links

```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/igsn/"
302: https://igsn.org/

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/igsn/DSR0000RQ"
303: http://hdl.handle.net/10273/DSR0000RQ

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/igsn/10273/au1243"
303: http://hdl.handle.net/10273/au1243
```
