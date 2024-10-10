This W3ID provides a persistent URI namespace for the AusTraits Plant Dictionary (APD).

# AusTraits Plant Dictionary (APD)

The AusTraits Plant Dictionary (APD) is a vocabulary that formally defines more than 500 plant trait concepts. It was developed in conjunction with [AusTraits](https://austraits.org), a database of Australian plant traits. 

It is expected to expand to include additional trait concepts. Each trait definition has been reviewed by multiple people and includes references and links to identical/similar traits in other trait databases whenever possible. The APD includes machine-readable formats and endpoints, allowing the traits to be readily re-used by other databases.

Suggestions for changes are welcome and can be posted at https://github.com/traitecoevo/APD/issues/.

## Vocabularies

* https://w3id.org/APD/
* https://w3id.org/APD/traits/
* https://w3id.org/APD/glossary/
* https://w3id.org/APD/releases/

## Homepage

* https://w3id.org/APD/
* https://github.com/traitecoevo/APD/
* http://austraits.org/

## Design

- the `.htaccess` code is written to process calls to variants of the machine-readable representations before any queries to `html`, i.e., `*.ttl`, `*.nq`, `*.nt`, and `*.json`, before `*.html`. This reduces the number of `RewriteCond` statements needed in the `html` section. 
- tested with https://htaccess.madewithlove.com (using `https://w3id.org/` as the base URL; `https://w3id.org/APD/` won't work, as code is written as though you're already in that subfolder)
- the following flags are used
  - `[R=303]` — A redirect. When a server responds with a `303` status code, it provides a `Location` pointing to a different URI. The client, upon receiving a `303` response, automatically makes a `GET` request to the URI specified in the `Location` header.  
  - `[L]` — If the previous conditions pass, this rule is executed, and no more evaluation is done. 
  - `[NE]` — (noescape) Prevents conversion of special characters to their hexcode equivalent; needed for links including a `#`.
- the following matches are used
  - `RewriteRule ^traits/trait_(.+)$ https://...` - the `(.+)` captures the 1 or more characters after `trait_` in the URL
  - `RewriteRule ^ https://...` - captures any URL that hasn't been matched by the previous rules. Same behaviour as `RewriteRule ^(.*)$ https://...`. Note behaves differently to `RewriteRule ^$ https://...` which would only match the root URL. 

## Usage

Site can be queried with call like the following

```
curl -L -H "Accept: text/html" https://w3id.org/APD/ -o APD.html
curl -L -H "Accept: text/turtle" https://w3id.org/APD/ -o APD.ttl
curl -L -H "Accept: application/n-triples" https://w3id.org/APD/ -o APD.nt 
curl -L -H "Accept: application/n-quads" https://w3id.org/APD/  -o APD.nq
curl -L -H "Accept: application/ld+json" https://w3id.org/APD/  -o APD.json
curl -L -H "Accept: ???" https://w3id.org/APD/ -o APD.html
curl https://w3id.org/APD/ -o APD.html

curl -L -H "Accept: text/html" https://w3id.org/APD/traits/ -o APD.html
curl -L -H "Accept: text/turtle" https://w3id.org/APD/traits/ -o APD.ttl 
curl -L -H "Accept: application/n-triples" https://w3id.org/APD/traits/ -o APD.nt 
curl -L -H "Accept: application/n-quads" https://w3id.org/APD/traits/  -o APD.nq
curl -L -H "Accept: application/ld+json" https://w3id.org/APD/traits/ -o APD.json
curl -L -H "Accept: ???" https://w3id.org/APD/traits/ -o APD.html
curl https://w3id.org/APD/traits -o APD.html

curl -L -H "Accept: text/html" https://w3id.org/APD/traits/trait_0012512 -o APD.html
curl -L -H "Accept: text/turtle" https://w3id.org/APD/traits/trait_0012512 -o APD.ttl
curl -L -H "Accept: application/n-triples" https://w3id.org/APD/traits/trait_0012512 -o APD.nt 
curl -L -H "Accept: application/n-quads" https://w3id.org/APD/traits/trait_0012512 -o APD.nq
curl -L -H "Accept: application/ld+json" https://w3id.org/APD/traits/trait_0012512 -o APD.json
curl -L -H "Accept: ???" https://w3id.org/APD/traits/trait_0012512 -o APD.html
curl https://w3id.org/APD/traits/trait_0012512 -o APD.html

curl -L -H "Accept: text/turtle" https://w3id.org/APD/release/1.0.0/ -o APD_1.0.0.ttl
curl -L -H "Accept: text/html" https://w3id.org/APD/release/1.0.0/ -o APD_1.0.0.html
curl -L -H "Accept: application/n-triples" https://w3id.org/APD/release/1.0.0/  -o APD_1.0.0.nt
curl -L -H "Accept: application/n-quads" https://w3id.org/APD/release/1.0.0/ -o APD_1.0.0.nq
curl -L -H "Accept: application/ld+json" https://w3id.org/APD/release/1.0.0/ -o APD_1.0.0.json
curl https://w3id.org/APD/release/1.0.0/ -o APD_1.0.0.html
```

## Contact

Space administered by Daniel Falster (http://github.com/dfalster) via <austraits.database@gmail.com>
