---
title      : A Digital Library Everywhere
description: 
modified   : 2020-01-08 15:22:00
created    : 
viewcount  : 26
id         : 123
gmap       : 
tags       :
    - India
    - digital library
    - taxonomy
    - specimens
stars      : 
---

The researcher is sitting in the café, researching ants on her phone. She goes to the digital library portal and types in "formica"

<figure>
    <img src="formica.gif">
</figure>

She gets back images, 3D scans of the holotype, and spectrograms and even mp3s of ant sounds.

<figure class="not100">
    <img src="ant-3d.gif">
    <figcaption>ant</figcaption>
</figure>

<figure class="not100">
    <img src="ant-sound-worker.png">
</figure>
<figure>
    <audio controls src="/entry-files/D/DI/DIG/Digital-Library-Everywhere/img/ant-sound-worker.mp3">
        Your browser does not support the <code>audio</code> element.
    </audio>
    <figcaption>ant worker</figcaption>
</figure>

<figure class="not100">
    <img src="ant-sound-soldier.png">
</figure>
<figure>
    <audio controls src="/entry-files/D/DI/DIG/Digital-Library-Everywhere/img/ant-sound-soldier.mp3">
        Your browser does not support the <code>audio</code> element.
    </audio>
    <figcaption>ant soldier</figcaption>
</figure>

<figure class="not100">
    <img src="ant-sound-queen.png">
</figure>
<figure>
    <audio controls src="/entry-files/D/DI/DIG/Digital-Library-Everywhere/img/ant-sound-queen.mp3">
        Your browser does not support the <code>audio</code> element.
    </audio>
    <figcaption>ant queen</figcaption>
</figure>

All this is possible because you added your research paper to the digital library.[^1] When you uploaded your born-digital PDF, it triggered a process that extracted the key facts from your paper with the help of semantic tags embedded in the text. The facts were then added to [TreatmentBank](https://treatmentbank.org) and also to the [Global Biodiversity Information Facility (GBIF)](https://gbif.org). From the TreatmentBank, the facts and any images (photographs, charts, diagrams) were also uploaded to Zenodo where they will be preserved for posterity, backed by the infrastructure of CERN and the European Union. When being uplooaded to [Zenodo](https://zenodo.org), each one of the discrete items were assigned a unique digital object identifier (DOI), a permanent ID that would identify them forever. In turn, all that data became searchable by [Zenodeo](https://zenodeo.punkish.org), a nodejs-driven API, and the binary files became findable via [Ocellus](https://ocellus.punkish.org), a Zenodeo-driven web application. Since you also uploaded the associated 3D scans of specimens and their sounds, they too became findable.

<figure>
    <img src="plazi-process.png">
    <figcaption>The Plazi process</figcaption>
</figure>

[^1]: While the resource described in this article is fictitious, all the parts that make up this resource are very real and already exist. By all measures, TreatmentBank is already the world's largest public domain database of taxonomic treatments extracted from text-mined biodiversity papers, and is providing continuous data to Zenodo, BLR, and GBIF. Ocellus, and Zenodeo, the API that powers Ocellus, already exist and are being continuously improved.