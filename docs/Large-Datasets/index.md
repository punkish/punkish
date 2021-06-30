---
title      : Large Datasets
description: 
modified   : 2005-10-02
created    : 2005-10-02
viewcount  : 37
id         : 232
gmap       : 
tags        :
    - 
stars      : 
tmpl       : 2_cols
ui          : 
---

By "large," we refer to the number of bytes. Geographically speaking, a large scale dataset refers to the proportion of real ground coverage versus the corresponding map coverage: larger the scale, smaller the amount of real world area covered by a fixed size map, larger the features on the map, etc.

Data size becomes very large either because of coordinate density or feature density. The former can be solved by the process of "thinning": a jpeg like lossy process. You don't want to "thin" the latter, however, otherwise you will lose data! For example, you don't want to lose any houses in a coverage of houses! 

To solve this, one starts working with spatial databases: take geographic data and stuff it in real databases. These databases are always rdbms - at least, have been thus far. 

The only problem with such solutions is typically a price to pay in reduced speed - rdbms will always add a complexity that will penalize the performance.

