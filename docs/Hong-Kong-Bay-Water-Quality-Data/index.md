---
title      : Hong Kong Bay Water Quality Data
description: 
modified   : 2018-08-06 21:53:00
created    : 2018-08-06 21:53:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - open data
    - water quality
    - Hong Kong
    - citizen science
    - art science
    - environmental monitoring
stars      : 
css        : 
    - hk
js         : 
    - hk
type       : 
    - isDygraph
---

<p class="u-cf">Yim Tin Tsai Fish Culture Zone water quality data measured in August 2018 by real-time water quality monitoring system of the Hong Kong Agriculture, Fisheries and Conservation Department (AFCD). Data provided by AFCD. Next reading in <span id="timer"></span> <em><b>Note:</b> The chart update has been sped by by 20X to make the web page more interesting. In real-life, the chart updates every ten minutes.</em></p>

<div id="graphContainer">
    <div id="graph"></div>
</div>

<p class="u-cf"></p>
The display of monitoring data was developed for the [gravitational currents and the life magic](https://emptygallery.com/exhibitions/eg12_gravitational-currents-the-life-magic/) exhibition at the [Empty Gallery Hong Kong](https://emptygallery.com) an exhibition of works by [Susanne Winterling](http://www.susannewinterling.com). It is a part of an artistic research project by Susanne that explores planetary sensing navigations below the surface.

<!-- <p><b>Note:</b> The readings are recorded at 10 min intervals. While that may be fine for real life, it is too long a time period to do any meaningful visualization over short periods. So we divide the emissionPeriod by the timerAdjustment to get a fake but more visualizable emissionPeriod. A timerAdjustment of 1 will keep the emissionPeriod to 10 mins. A timerAdjustment of 2 will halve the emissionPeriod to 5 mins, and so on. A default timerAdjusment of 60 is being used in the example above which sets the emissionPeriod to 10 seconds.</p> -->