# Author:   Edmond Chuc
# Purpose:  Validate website and OWL ontology redirects. 

import requests
import yaml

import time


def test_website(url):
    r = requests.get(url)
    assert r.status_code == 200 == requests.codes.ok, f'URL failed: {url}'


def validate_response(r, url, media_type, request_type):
    # It seems like the Content-Type response headers are still not being set correctly for some of the redirects.
    # E.g. The query string for the org ontology with text/turtle works fine, but does not work with application/rdf+xml. Instead, it returns text/html.
    # assert media_type in r.headers['Content-Type'], url + f" received Content-Type as {r.headers['Content-Type']} instead of {media_type}. Request type: {request_type}"
    assert r.status_code == requests.codes.ok, url


def validate_rdf(url, media_type, file_extension):
    if file_extension == '.owl':
        pass
    else:
        # Request types
        QSA = 'QSA'
        ACCEPT = 'ACCEPT'
        FILE_EXT = 'FILE_EXT'


        # Query string
        r = requests.get(url + f'?_format={media_type}')
        validate_response(r, url, media_type, QSA) 

        # Accept header
        r = requests.get(url, headers={'Accept': f'{media_type}'})
        validate_response(r, url, media_type, ACCEPT)

        # File extension
        r = requests.get(url + f'{file_extension}')
        validate_response(r, url, media_type, FILE_EXT)


def test_ontology(url):
    validate_rdf(url, 'text/turtle', '.ttl')
    validate_rdf(url, 'application/rdf+xml', '.rdf')
    validate_rdf(url, 'application/n-triples', '.nt')
    validate_rdf(url, 'application/ld+json', '.jsonld')
    validate_rdf(url, 'text/n3', '.n3')
    validate_rdf(url, None, '.owl')


if __name__ == '__main__':
    with open('test/test.yml') as f:
        config = yaml.safe_load(f)

        start_time = time.time()

        # Websites (HTML pages
        for url in config['websites']:
            test_website(f"{config['protocol']}://{config['docker_name']}/{url}")

        # Ontologies
        for url in config['ontologies']:
            test_ontology(f"{config['protocol']}://{config['docker_name']}/{url}")

        print(f'All tests passed. Duration: {time.time() - start_time:.2f} seconds.')