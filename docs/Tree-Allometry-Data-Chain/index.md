---
title      : Tree Allometry Data Chain
description: 
modified   : 2011-10-23 18:03:00
created    : 2011-10-23 18:03:00
viewcount  : 0
id         : 569
gmap       : 
tags        :
    - data chains
stars      : 
tmpl       : 2_cols
ui			: 
---

[D. Delgerjargal][dd] studies trees to establish allometric relationships between tree stem diameter and its biomass. Here is the data chain for her work:

[dd]: http://forestecology.forest.wisc.edu/dugarjav.html "D. Dugarjav"

* visit potential field sites and decide on which one is going to be our research site based on certain criteria such as plantation quality and distance to site 

<figure>
    <img src="img/map.png">
    <figcaption>map of study site courtesy D. Delgerjargal under a CC-BY 3.0 License</figcaption>
</figure>

* go to the field and measure trees for *diameter at breast height* (dbh) and enter plot size, plot number, tree number, and dbh in MS-Excel spreadsheet

* selectively cut some of the trees for "destructive analysis" on-site and weigh the biomass components of trees for wet mass and take sample branches and stem discs for further analysis to the lab

<figure>
    <img src="img/stem_disc.jpg">
    <figcaption>tree stem disc courtesy D. Delgerjargal under a CC-BY 3.0 License</figcaption>
</figure>

* categorize biomass samples into tissue types (stem, branch and foliage) and weigh them for wet mass and then dry them in the oven to obtain dry-mass

<figure>
    <img src="img/stem_dry_mass.png">
    <figcaption>stem dry mass image courtesy D. Delgerjargal under a CC-BY 3.0 License</figcaption>
</figure>

* take foliage sub-samples and measure for leaf area 

* use the wet-to-dry mass ratio to estimate dry-mass of biomass components of whole tree

* do statistical analysis to see if it meets certain assumptions, and if not, then transform the data to see if it meets the assumptions

* establish allometric relationships between stem diameter and dry mass of biomass components

* compose allometric equations in R

* validate and compare equations and produce plots and charts

