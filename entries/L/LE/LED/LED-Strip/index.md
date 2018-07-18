---
title      : LED Strip
description: 
modified   : 2018-06-03 12:12:00
created    : 2018-06-03 12:12:00
viewcount  : 59
id         : 149
gmap       : 
tags       :
    - code
    - Arduino
    - art
stars      : 
css        : led-strip
js         : led-strip
isLEDStrip : true
---


<div id="led-strip"></div>
<canvas id="smoothie-chart" width="550" height="50">
<div id="status"></div>
<div id="synData"></div>
<form>
    <input type="radio" name="synDataType" value="numbers" checked> numbers 
    <input type="radio" name="synDataType" value="letters"> letters 
    <input type="radio" name="synDataType" value="mixed"> mixed<br>
    <button id="synDataGenerator" type="submit">start</button>
</form>