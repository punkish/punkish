---
title      : A Well Designed API
description:
modified   : 2016-04-29 14:53:00
created    : 2016-04-29 14:53:00
viewcount  : 0
id         :
gmap       :
tags       :
    - API
    - REST
stars      :
---

An Application Programming Interface (API) is built on the premise that every query is a Uniform Resource Identifier (URI) and every answer is a standard HTTP Status Code and, where applicable, structured dataset in text format, preferably JavaScript Object Notation (JSON).[^1] Fortunately, there are not many preset rules to build an API. However, at the very basic, the API should conform to REpresentational State Transfer (REST) principles, be literate, discoverable, and keep its promises.

## RESTful API

URIs should point to a resource, and resources are nouns. Any action to be performed on the resource should be relegated to the HTTP verbs and limited to GET, PUT, POST and, if applicable, DELETE.[^2]

## Literate

The API should be understandable. The resource that a URI points to should be a collection. Filtering on the collection should be performed by query parameters. For example, if the URI points to books[^3]

<pre class="js">
// all or, alternatively, a predefined limited number of books
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books"

// a specific book
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books?title=All's Well That Ends Well"
</pre>
<p>
## Discoverable

Following the principles of a RESTful architecture, the API should be based on hypertext as the engine of application state (HATEOAS).

<pre class="js">
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books"

// result
{
    data : [
        {
            id : 1,
            title : "After the Beginning",
            author : "Carolyn Pogue",
            uri : "http://server.com/books?id=1"
        },
        {
            id : 2,
            title : "The Middle Ages: An Illustrated History",
            author : "Barbara A. Hanawalt",
            uri : "http://server.com/books?id=2"
        },
        {
            id : 3,
            title : "All's Well That Ends Well",
            author : "The Good Bard",
            uri : "http://server.com/books?id=3"
        }
    ]
}
</pre>
<p>
## Trustworthy

An API is a promise to the developers depending on it that things are not only what they claim to be, they will also remain that way. Of course, any dynamic system will change. A system that doesn't change is a dead system. To reconcile these opposing tensions, an API should offer a versioning system that follows the practices of [semantic versioning](http://semver.org).

<pre class="js">
// if no version defined then the latest version is presumed
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books"

// a version can be set explicitly
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books?api=v2.0.0"

// a very minor version change that fixes bugs and
// doesn't break the API
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books?api=v2.0.1"

// a minor version change that won't break the API but may
// return unexpected results because it adds functionality
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books?api=v2.1.0"

// a major breaking version
curl -i -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -X GET "http://server.com/books?api=v3.0.0"
</pre>
<p>
Ample warnings and documentation should be provided for upcoming version changes, for current version changes, and if any old version is going to be deprecated. Deprecation implies that applications using older versions will stop working, so it should be undertaken in extremely rare circumstances. This implies that, for the most part, older versions should continue to be offered.

## Other Considerations

This being a very brief, high-level treatment of API design, I have not mentioned important but obvious issues such as speed (can never be fast enough), amount of data returned, use of API keys, documentation, examples, etc. Those are all important considerations but they are more operational in nature.

[^1]: APIs can also return eXtensible Markup Language (XML)-formatted data. While XML is also a text format, arguably XML is not as simple and lightweight as JSON. Also, JSON is easier to manipulate and compute with because, as native JavaScript, it requires nothing but plain JavaScript to execute and convert to plain text strings and back again to JavaScript objects.

[^2]: For the sake of simplicity, I am glossing over other HTTP verbs such as PATCH, OPTION and HEAD.

[^3]: For simplicity, the content-type headers and HTTP verbs are not shown in the examples.
