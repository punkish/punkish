---
title      : Basics of GIS
description: An Intro to Geographic Information Systems
modified   : 2005-10-02 00:00:00
created    : 2005-10-02 00:00:00
where      : online to students at the University of Waterloo
when       : October 2015
tags       :
    - presentation
    - geospatial
    - GIS
notes      : I gave the following "lecture" to a bunch of IIT students visiting University of Waterloo under a program organized by <a href="http://www.cs.uwaterloo.ca/~keshav/">Srinivasan Keshav</a>.
---

## A GIS Is Like A Database

* GIS does not store maps
* GIS stores information from which maps can be made
* maps are like views in a database \x96 one set of tables, many views
* examples of "views"
   * **scale:** change extent of "ground" shown on the map (larger the number => smaller the scale => more the area shown => less the detail)
   * **projection:** [map projections](http://www.colorado.edu/geography/gcraft/notes/mapproj/mapproj_f.html) represent spherical shapes on flat surface (Mercator, Albers, Lambert)
   * **isopleth:** represent continuous area data that varies smoothly over space (contours, isohyet, isotherm, isobar, isohume)
   * **choropleth:** each spatial unit is filled with a uniform color or pattern (tax maps, density maps, land use)
* GIS allows [Spatial Analyses]() of mappable data

---

## GIS Manages Both Spatial and Non-Spatial Data

* **Spatial information:** that with coordinates, or GeographicDatasets
* cells, points, lines, polygons
* **Non Spatial information:** attributes of spatial information, held in database tables
* income, age, political leaning

---

## Two Ways Of Representing Geographic Data

* **vectors:** geometric definitions of data (think Adobe Illustrator). Examples include [ArcInfo](http://www.esri.com/software/arcgis/index.html), [MapInfo](http://www.mapinfo.com), [GeoMedia](http://www.intergraph.com/geomedia/)

![vector](../img/vector.png)

* **raster:** area divided, or [tessellated](http://www.answers.com/tessellate) into a grid (think Adobe Photoshop). The most famous example is the free and open source [GRASS](http://grass.itc.it)

![raster](../img/raster.png)

---

## Several Ways To Acquire GIS Data

* Geographic data acquired via 
   * digitizing paper maps
   * scanning, then vectorizing, paper maps
   * [Global Positioning System](http://www.trimble.com/gps/what.html) data stream
   * [satellite imagery](http://www.spaceimaging.com/)
   * [geocoding](http://www.mapquest.com/features/main.adp?page=geocode) - converting standardized addresses to x,y coordinates

---

## Traditional Way Of Storing GIS Data

* Proprietary file-based format
* File extensions (.dat, .map, .shp, .shx, .dbf) denote what kind of data are stored within (coordinates, attributes, indexes)
* Data exchange done via some intermediate export-import format

New trend: store as [Geographic Databases](/Geographic-Databases)

---

## Storing Geographic Data In Databases

* stuff the geographic data into a database
* extend the SQL with spatial operators
* use extended SQL syntax to select, analyze, and display the data. 
* This is a client/server model
   * db is the server
   * application to display the data is the client
* examples 
    - [ArcSDE](http://www.esri.com/software/arcgis/arcsde/index.html)
    - [PostGIS](http://postgis.refractions.net/)
    - [Oracle Spatial](http://www.oracle.com/technology/products/spatial/index.html)

Comparing [Geographic Datasets Versus Databases](/Geographic-Datasets-Versus-Databases)

---

## Comparing Geographic Databases To Datasets

* Disadvantages
** A slight performance hit - [Geographic Datasets] almost always faster
** data preprocessing is required before stuffing it in the db
* Advantages
** a real db with transactions
** Atomicity, Consistency, Isolation, and Durability (ACID)
** Creating, Updating, Deleting (CRUD-ing) data as easy as spatialized SELECT, INSERT, UPDATE, and DELETE
** Very [Large Datasets] can be managed

Either way, several different kinds of [Spatial Analyses] are possible

---

* Boolean operations - Union, Identity, Intersect

![booleanoperations](../img/booleanoperations.png)

* Spatial overlays - point-in-polygon, line-in-polygon, polygon-in-polygon

![overlayoperations](../img/overlayoperations.png)

* Networks operations - shortest distance, shortest time, location-allocation

![networkoperations](../img/networkoperations.png)

There are many ways of [Outputting Geographic Data].

* [Spatial Analyses](/Spatial-Analyses)

---

## Various Ways Of Displaying Geographic Data

* paper maps, online, cellphones and hand-helds

![outputtinggeogdata](../img/outputtinggeogdata.png)

There are many [Applications of GIS](/Applications-of-GIS)

---

## Solving Real-World Problems With GIS

* natural resources (forestry, wildlife corridors)
* planning (urban and rural development)
* routing (shortest route)
* analyses (demand mapping)
* modeling (floodplain, pollution fallout)
* business intelligence (demographics, sales location)

GIS implementation involves solving [Technological Issues](/Technological-Issues)

---

## Technological Hurdles To GIS Implementation

* very large datasets (can be Terabytes)
   * so network and hard disk speeds are bottlenecks
   * a lot more information and user initiated actions than a simple table
	  * user-interface is a challenge
   * large graphics processing
	  * cpu-intensive for real-time smooth display

More challenging, however, are the [Institutional Issues](/Institutional-Issues).

---

## Institutional Hurdles To GIS Implementation

* [Data Sharing](/Data-Sharing)
* [Data Custodianship](/Data-Custodianship)
* [Agency Coordination](/Agency-Coordination)
* [Process Management](/Process-Management)

A [Consortium Approach](/Consortium-Approach) is common in GIS implementation.

---

## Many Agencies Working Together

* Unlike regular databases, GIS requires a consortium approach
* Requires a [Governance Model](/Governance-Model) of some sort
* Requires cooperation
   * Give up control
   * Take responsibility

[Interdisciplinary Collaboration](/Interdisciplinary-Collaboration) is usually necessary.

---

## Many Disciplines Working Together

* Not a established DBA-kind of gatekeeper
* More interdisciplinary, requiring collaboration

Because of the large number of players involved, both managing and using the data, [Web Based GIS](/Web-Based-GIS) solutions are becoming very popular.

---

## Putting Maps On The Web

* db, map, and web server work together to put maps and limited but useful functionality accessible via a browser.

![webbasedgis](../img/webbasedgis.png)

Traditional implementation is like most web applications - a point-to-point [Web Model](/Web-Model).

---

## Point-to-Point Publishing

* provider publishes, user views

![ptppublishing](../img/ptppublishing.png)

This point-to-point publishing made web what it is today. However, the inherent disadvantage is that everyone who wants to publish has to have their own datasource. This is akin to the way [Restrictive Software] works.

The current web implementation rage is [Web Services Model](/Web-Services-Model).

---

## Distributed Publishing

![distributedpublishing](../img/distributedpublishing.png)

* provider publishes
* user can assimilate and re-publish
* user views the re-published data
   * Screen scraping
   * web distributed data exchange (WDDX)
   * XML (RSS, SOAP, REST)

[Map Services Model](/Map-Services-Model) is really the idea of web services applied to GIS

---

## Web Map Services

Provider publishes, user can assimilate from various sources and re-publish, other users can view... this brings up [Parallels Between FOSS and GIS].

![distributed_publishing](../img/distributedpublishing.png)

Explore [Further Links](/Further-Links) on GIS.

---

## Both Are Collaborative In Nature

* For both GIS and free and open source software (FOSS) to succeed, collaboration is essential. 
* GIS, by its very nature, is not the domain of one. It requires a [Consortium Approach] and [Interdisciplinary Collaboration]. [Data Custodianship] is one of the basic necessities of GIS, and a [Governance Model] is required to make sure all parties play well with each other.
* FOSS has never been the domain of one. It has been possible only because of the interactive, interdependent, and sharing nature of the internet. FOSS movement has even created technologies such as P2P (Grokster, Gnutella), cooperative distribution (BitTorrent), version control (CVS, SubVersion) that promote such interdependence and thereby promote itself.

More about [Open Source](/Open-Source).

---

## GIS Related Links

* [GIS.com](http://www.gis.com)
* [The Geographer's Craft](http://www.colorado.edu/geography/gcraft/contents.html)
* [Wisconsin State Cartographer's Office](http://www.geography.wisc.edu/sco/)
* [US Geological Survey](http://www.usgs.gov)
* [National Center for Geographic Information and Analysis](http://www.ncgia.ucsb.edu/)
* [GIS on Wikipedia](http://en.wikipedia.org/wiki/GIS)
* [Mapserver](http://mapserver.gis.umn.edu)
* [Open Geospatial Consortium](http://www.opengeospatial.org/)

and, of course,

* [GIS on Google](http://www.google.com/search?hl=en&lr=&c2coff=1&client=safari&rls=en-us&q=GIS&btnG=Search)