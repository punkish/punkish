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

<div id="graph" style="width: 960px; height: 540px; margin-bottom: 24px;"></div>

<select name="sonde" class="graphControl u-pull-left">
    <option value="">choose a sonde…</option>
    <option value="Upper">Upper</option>
    <option value="Lower">Lower</option>
</select>

<input type="range" name="time" min="0" max="7" step="1" onchange="ranger();" class="graphControl u-pull-left">
<div id="timerAdjustment" style="width: 100px; height: 25px; border: 1px solid black;" class="graphControl u-pull-left"></div>

<p class="u-cf">Yim Tin Tsai Fish Culture Zone red tide data measured in June 2018 by real-time water quality monitoring system of the Hong Kong Agriculture, Fisheries and Conservation Department (AFCD). Data provided by AFCD.</p>

**Note:** The readings are recorded at 10 min intervals. While that may be fine for real life, it is too long a time period to do any meaningful visualization over short periods. So we divide the emissionPeriod by the timerAdjustment to get a fake but more visualizable emissionPeriod. A timerAdjustment of 1 will keep the emissionPeriod to 10 mins. A timerAdjustment of 2 will halve the emissionPeriod to 5 mins, and so on. A default timerAdjusment of 60 is being used in the example above which sets the emissionPeriod to 10 seconds.