---
title      : The Reformation APIs
description:
modified   : 2017-10-24 19:15:00
created    : 2017-10-24 19:15:00
viewcount  : 0
id         :
gmap       :
tags        :
    - code
    - nodejs
    - APIs
stars      :
---

<figure>
    <img src="luther_95_thesen.jpg" width="100%">
</figure>

If five hundred years ago, almost to the day, a monk can hang his theses to change the course of religion, I can, rather more modestly, create a few APIs to experiment with changing how information is accessed or processed. I call these, my adventures in programming, the Reformation APIs.

## Zenodeo

`Zenodo + nodejs = Zenodeo`

[Zenodo](https://zenodo.org) has an API, but we wanted an API that would serve the needs of the [Biodiversity Literature Repository](https://biolitrepo.org) community. Additionally, we wanted to provide more documentation and hand-holding than is provided by Zenodo. While we were at it, we also decided to document the API using the [OpenAPI 3.0](https://www.openapis.org/) specification. Presenting [Zenodeo](http://zenodeo.punkish.org/about)

## Deuxems

I am building a REST interface to simple NLP tasks as a device to learn both programming and NLP. For now, it supports

- tokenize and stem
- POS tagging
- n-grams
- geoparsing

Check out [Deuxems](http://deuxems.punkish.org/about)
