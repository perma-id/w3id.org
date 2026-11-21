# Turn off MultiViews
Options -MultiViews

# Directive to ensure *.rdf files served as appropriate content type,
# if not present in main apache config
AddType application/rdf+xml .rdf
AddType application/rdf+xml .owl
AddType text/turtle .ttl
AddType application/n-triples .n3
AddType application/ld+json .json

Header set Access-Control-Allow-Origin *
Options +FollowSymLinks
RewriteEngine on

RewriteCond %{HTTP_ACCEPT} !application/rdf\+xml.*(text/html|application/xhtml\+xml)
RewriteCond %{HTTP_ACCEPT} text/html [OR]
RewriteCond %{HTTP_ACCEPT} application/xhtml\+xml [OR]
RewriteCond %{HTTP_USER_AGENT} ^Mozilla/.*
RewriteRule ^$ http://ontologies.adaptcentre.ie/bvas/ [R=303,L]

# Rewrite rule to serve RDF/XML content from the vocabulary URI if requested
RewriteCond %{HTTP_ACCEPT} \*/\* [OR]
RewriteCond %{HTTP_ACCEPT} application/rdf\+xml
RewriteRule ^$  http://ontologies.adaptcentre.ie/bvas/ontology.xml [R=303,NE,L]

# Rewrite rule to serve TTL content from the vocabulary URI if requested
RewriteCond %{HTTP_ACCEPT} text/turtle [OR]
RewriteCond %{HTTP_ACCEPT} text/\* [OR]
RewriteCond %{HTTP_ACCEPT} \*/turtle 
RewriteRule ^$  http://ontologies.adaptcentre.ie/bvas/ontology.ttl [R=303,NE,L]

# Rewrite rule to serve JSON-LD content from the vocabulary URI if requested
RewriteCond %{HTTP_ACCEPT} application/ld\+json
RewriteRule ^$ http://ontologies.adaptcentre.ie/bvas/ontology.json [R=303,L]

# Rewrite rule to serve N-Triples content from the vocabulary URI if requested
RewriteCond %{HTTP_ACCEPT} application/n-triples
RewriteRule ^$ http://ontologies.adaptcentre.ie/bvas/ontology.nt [R=303,L]
