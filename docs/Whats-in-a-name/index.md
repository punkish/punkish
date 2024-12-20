---
title      : What’s in a Name
description: 
modified   : 2016-01-02 15:54:00
created    : 2016-01-02 15:54:00
viewcount  : 0
id         : 232
gmap       : 
where      : presentation
when       : January 2016
tags       :
    - presentation
    - science
    - names
    - taxonomy
stars      : 
notes      : why names matter in taxonomy, and how technology can help.
---

## What’s in a Name?

???

Names introduce species to humanity. It’s a biologist’s greatest contribution.

--

<div class="author">by Puneet Kishor on behalf of <a href="">Plazi<a></div>

Released under a [CC0 Public Domain Dedication](http://creativecommons.org/publicdomain/zero/1.0/).

<hr>

**Help:** Notes are hidden, but may be seen or hidden by pressing 'p'. Swipe on touch devices or use ← and → keys on your keyboard to change slides.

---

## What’s in a Name?

Names introduce species to humanity. It’s a biologist’s greatest contribution.
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
But such research is getting less support.

---

## What’s in a Name?

All awareness, conservation and research of nature starts with the question:
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
*which species is that?*

---

## Odonatologica 44(4)

Dijkstra K.-D.B., Kipping J. & Mézière N. 2015. Sixty new dragonfly and damselfly species from Africa, Vol. 44(4), published 1st December 2015

--

### Existing knowledge * 1.1

Sixty new dragonflies from Africa were named, increasing the number known by almost 10% at once. All are colorful and conspicuous, representing some of the most sensitive and beautiful of all biodiversity: 

- freshwater
- Earth’s most dense and threatened species richness—Africa, the continent that will change most in the 21st century, and 
- dragonflies, the insects that may be among the best gauges of global change.

<cite>
<a href="https://goo.gl/KGMsyC" target="_blank">Press release</a><br>
<a href="https://goo.gl/vRoJSL" target="_blank">Info and images</a><br>
<a href="http://www.osmylus.com/index.php/downloads" target="_blank">Full publication</a><br>
<a href="http://youtu.be/Arr2k7dwzSU" target="_blank">Watch discovery of new species in DR Congo</a><br>
</cite>

---

## Odonatologica 44(4)

<img src="img/odonatologica-44-download-page.jpg" width="70%">

<span class="hilite">A free, low resolution PDF !!</span>

---

## Response

We applaud the effort, and the dragonflies are wonderful

--

*but*

- Does it in an open access journal? **No**
- Does the article have a DOI so that it can be easily cited? **No** 
- Are the names registered with ZooBank? **No** 
- Are the DNA sequences available in GenBank? **No** 
- Is the data available for downloading? **No**
- Has the distributional data been deposited in GBIF? **No**

--

Surely we need to think about the best way to make all this hard work as widely accessible as possible? A PDF with wonderful pictures of dragonflies and low resolution maps does not represent the best that modern taxonomic publishing can offer.

---

## Not Open, Not Good for Science

<img src="img/odonatologica-44.jpg">

---

## Enter Plazi 

- Grab the document
- Retrieve or assign a DOI
- Use GoldenGATE Imagine to semantically enhance the document
    - XML document with proper word-flow
    - tables and figures discovered
    - captions discovered linked to respective figures and tables
    - Figure citation linked with the respective caption
    - IMF created

---

## Plazi Aim

Create a knowledge graph where we focus on a set of elements that are linked through persistent identifiers which we hopefully can turn into a graph derived by machine. 

---

## Plazi Outputs

- Bibliographic metadata
- Bibliographic references parsed
- Taxonomic names parsed and hierarchy added
- New taxon names added to Zoobank and with retrieved LSID new taxon names annotated
- Treatment and Treatment structure tagged
- MaterialsCitation tagged and parsed
- MaterialsCitation with BOLD IDs annotated
- Visualized the data
- Make sure that the data export to GBIF, NCBI, Wikidata and MOL works

---

## Starting Point

- original [PDF](http://www.osmylus.com/images/own/Downloads/Odonatologica_44-4-low_res.pdf)
- Plazi treatments: [Summary List](http://plazi.cs.umb.edu/GgServer/summary/FF9B2A1CCA19FFEAEE22FFED4105FFB2) and [RDF](http://plazi.cs.umb.edu/GgServer/rdf/03A25264CA15FFFAEF37FB524211FE1F)
- Darwin Core Archive: [DWCA](http://plazi.cs.umb.edu/GgServer/dwca/FF9B2A1CCA19FFEAEE22FFED4105FFB2.zip)
- Zoobank [entry](http://zoobank.org/References/A0592344-0F17-4463-8CE2-02900DBB8F20)
- EU-NOMEN: implementation in March 2016
- Species-ID [entry](http://species-id.net/wiki/Umma_gumma)
- Wikidata: [article](https://www.wikidata.org/wiki/Q21714913), [list of entries](https://www.wikidata.org/w/index.php?title=Special:WhatLinksHere/Q21714913&namespace=0&limit=100), [discussion](https://www.wikidata.org/wiki/Wikidata_talk:WikiProject_Taxonomy#Dragonflies)

---

## Starting Point

- GBIF: [record map](http://www.gbif.org/occurrence/search?DATASET_KEY=7b04b312-ad6f-4161-b6a4-7d48bee99014)
- NCBI Taxonomy Linkout: uploaded and processed
- MOL: in discussion
- ORD.CH: in process
- EOL: in process
- BOLDSystems: request sent
- BLR: DOI: [10.5281/zenodo.35388](http://dx.doi.org/10.5281/zenodo.35388)
- Discussion on Taxacom: [Explanation of project](http://taxacom.markmail.org/search/?q=#query:%20from%3A%22Donat%20Agosti%22+page:1+mid:fapu44cuusylw47w+state:results)

---

## Plazi Makes a Publication Flower

<img src="img/flower.png" height="400">

---

## Conclusion

.left-column[
### More automation
]

.right-column[
Technically and network wise we have all in place and with enough knowledge connections all the problems can and have been solved with the exception to NCBI, MOL/BarcodeSystem and EOL. The reasons are generally slow contact, to be established and quasi non-functional respectively, and thus not much to be done but the former two need more automation.
]

---

## Conclusion

.left-column[
### More automation
### Better tools
]

.right-column[
It is clear though that it is a tiresome process with a high frustration potential, by tools that don’t work and are not clearly labeled and thus risking to waste a lot of time, and on the other side a lot of emails that can become discouraging - though not meant so.
]

---

## Conclusion

.left-column[
### More automation
### Better tools
### Visualization
]

.right-column[
But the end, being able to provide data and especially to visualize content is really great, as much as it is to provide an inroad into the data of taxonomy and thus a particular view of the living world
]

---

## Conclusion

.left-column[
### More automation
### Better tools
### Visualization
### Scaling
]

.right-column[
Scaling up is still a big issue. 
]

---

## Conclusion

.left-column[
### More automation
### Better tools
### Visualization
### Scaling
### TaxPub
]

.right-column[
Promotion of moving into TaxPub publishing ought be the most effective way forwards.
]

---

## Conclusion

.left-column[
### More automation
### Better tools
### Visualization
### Scaling
### TaxPub
### Resources
]

.right-column[
What are the impediments to getting the resources to make such a push? Are people and institutions not convinced that this is a problem? Is the investment perceived to be too much compared to the returns? Do we need to make a smaller-scale working pilot and then let it be replicated in many locations instead of creating a single behemoth that may or may not work? All these issues need to be examined critically.”
]

---

## Conclusion

.left-column[
### More automation
### Better tools
### Visualization
### Scaling
### TaxPub
### Resources
### DAK
]

.right-column[
Having the data available in this form might also lead to assign a DAK value to a publication. How much digital accessible knowledge (DAK) is in a paper? This is not to have a paper, but at the end how much does a paper contribute in terms of data to distribution modeling? This could be a mixture of  number of treatments and specimens per treatment with geo coordinates, percentage of geo coordinates from GPS
]

---

## Acknowledgements

- Jens Kipping, Nicolas Mézière, Klaas-Douwe B. Dijkstra  
- Naturalis Biodiversity Center, Leiden, The Netherlands Conservation Ecology and Entomology, Stellenbosch University, South Africa  
- Rod Page  
- Donat Agosti  
- Jeremy Miller

---

