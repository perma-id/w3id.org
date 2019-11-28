# Tests

Configure the `test.yml` file to test the rewrite rules in Apache. 


## Build the Docker image

```
docker build -t test .
```


## Run the Docker image

```
docker run --rm --name test -v ${PWD}:/test --network test test python /test/test.py
```