---
title      : Hong Kong Bay Red Tide Data
description: 
modified   : 2018-08-06 21:53:00
created    : 2018-08-06 21:53:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - data
    - red tide
    - Hong Kong
stars      : 
css        : hk
js         : hk
layout     : dygraph-charter
---

<div id="graphContainer">
    <div id="graph"></div>
</div>

<!--
<div id="controls">
<select name="sonde" class="graphControl u-pull-left">
    <option value="">choose a sonde…</option>
    <option value="Upper">Upper</option>
    <option value="Bottom">Bottom</option>
</select>

<input type="range" name="time" min="0" max="7" step="1" class="graphControl u-pull-left">

<div id="timerAdjustment" class="graphControl u-pull-left"></div>
</div>
-->

<p class="u-cf">Yim Tin Tsai Fish Culture Zone red tide data measured in June 2018 by real-time water quality monitoring system of the Hong Kong Agriculture, Fisheries and Conservation Department (AFCD). Data provided by AFCD.</p>

**Note:** The readings are recorded at 10 min intervals. While that may be fine for real life, it is too long a time period to do any meaningful visualization over short periods. So we divide the emissionPeriod by the timerAdjustment to get a fake but more visualizable emissionPeriod. A timerAdjustment of 1 will keep the emissionPeriod to 10 mins. A timerAdjustment of 2 will halve the emissionPeriod to 5 mins, and so on. A default timerAdjusment of 60 is being used in the example above which sets the emissionPeriod to 10 seconds.
