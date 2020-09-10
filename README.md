# A SPARQL GUI for Queries from Github and other web repositories (Code used for SPARQL Lab)


## run project
```bash
docker-compose up --build
```

## description

This project provides mainly glue code. It makes heavy use
of Laurens Rietveld's great [YASQE](http://yasqe.yasgui.org/) and
[YASR](http://yasr.yasgui.org/) javascript libraries, part of his
[YASGUI](http://yasgui.org) project.

## URL arguments

The script is controlled by the following URL arguments:  

Argument | Description
---------|------------
endpoint | URL of a SPARQL endpoint (defaults to an endpoint with the STW version history). Remote endpoints have to be [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) enabled.
query    | URL-encoded query text (takes precedence over queryRef if both are defined, defaults to the YASQE built-in example query if neither).
queryRef | URL of a query on the web (no default). Works with GitHub API as in the example below, and presumably with other public repository URLs (CORS on the repository server required).
hide     | With `hide=1`, the query pane is hidden from display (defaults to hide=0).
