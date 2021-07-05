---
title      : Community Ontology
description: 
modified   : 2007-02-14 00:00:00
created    : 2007-02-14 00:00:00
where      : University of Wisconsin-Madison
when       : February 2007
authors    : 
    - Lewis Friedland, School of Journalism and Mass Communications, UW-Madison
tags       :
    - presentation
    - citizen journalism
notes      : exploring ontology relevant in the context of a community.
---

## What is "Ontology"?

* The terms used to describe and represent an area of knowledge
* Includes… definitions of basic concepts in the domain and the relationships among them
* Encodes knowledge *in* a domain and also knowledge that *spans* domains
slidehandout:

---

## What is "Community"?

* An aggregation of organizations, people, locations, and relationships between them
* Is usually physical, but can also be logical

---

## "Community Ontology"

* The terms used to describe and represent knowledge of…
* entities and relationships among them in…
* an aggregation of organizations, people, locations, and relationships between them

---

## What is Resource Description Framework?

* a framework for representing information in the Web
* a general-purpose language for representing information in the Web
* allows anyone to make statements about any resource

---

## RDF is a collection of triples

In Perl
<pre><code>
%ball = (
  shape => "round",
  color => "red",
  feels => "squishy",
  taste => "yucky",
);
</code></pre>

In RDF

* the "ball" has a property called "shape" whose value is "round"
* the "ball" has a property called "color" whose value is "red"
* the "ball" has a property called "feels" whose value is "squishy"
* the "ball" has a property called "taste" whose value is "yucky"

---

## RDF is a collection of triples

In RDF

* *subject* (the "ball") &ndash; an RDF URI reference or a blank node
* *predicate* (the "shape," "color," or "feels" properties) &ndash; represented by RDF URI references
* *object* ("round," "red," or "squishy," the values of the corresponding predicates) &ndash; represented by RDF URI references, literals or blank nodes

---

## RDF is a collection of triples

![RDF Triple Graph](rdf_triple_graph.png)

---

## Describing an Entity

In RDF

A bundle of triples can describe an entity uniquely
Just like in Perl a hash can
<pre><code>
%ball = (
  shape => "round",
  color => "red",
  feels => "squishy",
  taste => "yucky",
);
</code></pre>
