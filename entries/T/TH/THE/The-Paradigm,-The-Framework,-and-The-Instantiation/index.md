---
title      : The Paradigm, The Framework, and The Instantiation
description: 
modified   : 2011-10-12 11:11:11
created    : 2011-10-12 11:11:11
viewcount  : 0
id         : 643
gmap       : 
tags        :
    - web
    - REST
    - open data
stars      : 
tmpl       : 2_cols
ui			: 
---

There are three independent yet inter-related concepts at play when building an open data infrastructure for science -- I call them "The Paradigm," "The Framework," and "The Instantiation."

## The Paradigm

The web is our inspiration. Arguably the most important human invention since the printing press, the web has succeeded, for the most part, because of its simplicity. The web allows easy and ubiquitous data sharing. Hence, the paradigm is the architecture on which the web is built.

This architecture relies on unique nouns and a limited vocabulary of verbs. Every resource has a unique identifier, a noun, which is its [uniform resource identifier](http://www.ietf.org/rfc/rfc2396.txt). This URI is reachable from anywhere in the world, and always identifies a unique resource.

It is of utmost importance to realize that URIs are unique, and that ["cool URIs don't change."](http://www.w3.org/Provider/Style/URI) If, for some reason, the path to the URIs changes, proper use of [http redirect codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) can lead the user to the new location.

The limited vocabulary of verbs are those implemented by the hypertext transfer protocol (http). The commons ones are [GET, HEAD, PUT, DELETE, and POST, and a couple of others](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).

Articulated by Fielding as [REpresentational State Transfer, or REST](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm), the architecture of the web, is our paradigm.

## The Framework

The web allows us to easily serve resources and for users to easily reach those resources. But, in science, we need a way to correlate different resources.  While correlation does not indicate causation, correlation is the first step toward understanding, because it allows us to put seemingly disparate things in the same framework. Because everything happens somewhere at some time, we use the framework of space and time to correlate disparate data. The four vectors of *x*, *y*, *z*, and *t* allow us to view things in relation to each other.

Hence, space and time are our unifying framework.

## The Instantiation

According to [Tobler's first law of geography](http://www.geog.ucsb.edu/~tobler/publications/pdf_docs/geog_analysis/ComputerMovie.pdf), "everything is related to everything else, but near things are more related than distant things." Taking disparate datasets and unifying them in a common framework is one thing, but users still have to be able to find them, and do something useful with them. The instantiation allows us to bring these disparate datasets close to each other, perhaps at a single parent URI, where data creators and publishers can submit their data streams and data users can discover and explore them. The instantiation also allows us to offer additional user services such as accounting (*who is using my data?*), permanence and caching (*make my data available even if my own server goes down*), discovery (*what are all the data sets that meet certain criteria?*), licensing (*what can I legally do with a data?*), and more.

We are building [Earth-Base](http://earth-base.org), an **Instantiation** built on **The Paradigm** using **The Framework**.

## Summary

The Paradigm allows us to serve our data and to allow others to use them, because if it is not available on the web, it doesn't exist for the rest of us. The Framework allows us to unify disparate datasets. And, the Instantiation allows us to bring the datasets into a common space, in close proximity, add additionaly services and value, and enable new, interdisiplinary discovery and science.

Not all datasets can be served, as is, per the Paradigm. That is ok. We can't solve **all** the problems, but we can make **a lot** of data available to others. The data chain, from raw data that come out of sensors all the way to cooked data that have been analyzed and interpreted, has many steps. At **some** step in the data chain, the data become suitable for serving on the web.

Not all datasets may fit the space/time framework. That is ok as well. But, most will, and we can bring those into the fold.

There have been many initiatives, some abandoned, some continuing, to build a data infrastructure. Earth-Base would offer the proven simplicity of the web, the conceptually easy to understand space/time framework, and the space within which different data sets can be offered, discovered, compared, integrated and analyzed.


