---
title      : Community Ontology
description: 
modified   : 2007-02-15
created    : 
viewcount  : 0
id         : 91
gmap       : 
tags        :
    - 
stars      : 
---

slide:
= Community Ontology =
=== Puneet Kishor ^1^ and Lewis Friedland ^2^ ===
==== University of Wisconsin-Madison ====
===== 1. Nelson Institute for Environmental Studies =====
===== 2. School of Journalism and Mass Communication =====
slidecontent: 
slidehandout:

slide:
= What is "Ontology"? =
slidecontent:
* The terms used to describe and represent an area of knowledge
* Includes ... definitions of basic concepts in the domain and the relationships among them
* Encodes knowledge *in* a domain and also knowledge that *spans* domains
slidehandout:

slide:
= What is "Community"? =
slidecontent:
* An aggregation of organizations, people, locations, and relationships between them
* Is usually physical, but can also be logical
slidehandout:

slide:
= "Community Ontology" =
slidecontent:
* The terms used to describe and represent knowledge of...
* entities and relationships among them in...
* an aggregation of organizations, people, locations, and relationships between them
slidehandout:

slide:
= Problem =
slidecontent:
* Lew says, "Puneet, go to the <community> website...
* identify all the organizations, people, and places, and...
* deduce the relationships between them
* Store it all in a repository"
slidehandout:

slide:
= Solution 1 =
slidecontent:
* Go to the <community> website
* Visually identify all the organizations, people, and places
* Visually deduce the relationships between them
* Store it all in a repository
slidehandout:

slide:
= Solution 2 =
slidecontent:
* Write a program to crawl the <community> website
* Download all the webpages and strip out the html tags
* Open the plain text in an named-entity-tagger (NET) program
* Manually tag the entities
* Deduce the relationships between the entities
* Store it all in a repository
slidehandout:

slide:
= Solution 3 =
slidecontent:
* Write a program to crawl the <community> website
* Download all the webpages and strip out the html tags
* Run the plain text through an automated named-entity-tagger (NET) program
* Get the results and decide where the precision and recall are satisfactory
* Deduce the relationships between the entities
* Store it all in a repository
slidehandout:

slide:
= Is There A Better Solution? =
slidecontent:
* Yes, let the community tell you its who, what, and where, and their relationships. How?
* By having them store their data in a format that is readable by other programs, yet
* Allows them to publish their information as they wish
slidehandout:

slide:
= Structure Of A Web Page =
slidecontent:
<pre>
&lt;p&gt;Welcome to our community.&lt;/p&gt;
&lt;b&gt;Artie MacStrawman&lt;/b&gt;
&lt;i&gt;Mayor&lt;/i&gt;
&lt;p&gt;Meet your city council.&lt;/p&gt;
&lt;ul&gt;
  &lt;li&gt;Councilwoman Elena&lt;/li&gt;
  &lt;li&gt;Councilman Joseph&lt;/li&gt;
&lt;/ul&gt;
</pre>
slidehandout:

slide:
= Structure Of An Intelligent Web Page =
slidecontent:
<pre>
&lt;p&gt;Welcome to our community.&lt;/p&gt;
&lt;person&gt;Artie MacStrawman&lt;/person&gt;
&lt;title&gt;Mayor&lt;/title&gt;
&lt;p&gt;Meet your &lt;agency&gt;city council&lt;/agency&gt;.&lt;/p&gt;
&lt;ul&gt;
  &lt;li&gt;&lt;title&gt;Councilwoman&lt;/title&gt; &lt;person&gt;Elena&lt;/person&gt;&lt;/li&gt;
  &lt;li&gt;&lt;title&gt;Councilman&lt;/title&gt; &lt;person&gt;Joseph&lt;/person&gt;&lt;/li&gt;
&lt;/ul&gt;
</pre>
slidehandout:
END

