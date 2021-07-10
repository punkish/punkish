---
title      : Water Quality Monitoring
description: 
modified   : 2018-08-06 21:43:00
created    : 2018-08-06 21:43:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - open data
    - open hardware
    - water quality
    - Hong Kong
    - citizen science
    - red tide
    - art science
    - environmental monitoring
stars      : 
---

<style>
td.num,
th.num {
    text-align: right;
}
</style>

<div class="row">
    <div class="six columns">
        <figure>
            <img src="img/wmd1.jpg">
            <figcaption>Water quality monitor</figcaption>
        </figure>
    </div>
    <div class="six columns">
        <figure>
            <img src="img/wmd2.jpg">
            <figcaption>schematic</figcaption>
        </figure>
    </div>
</div>

I created this water monitoring device for the [gravitational currents and the life magic](https://emptygallery.com/exhibitions/eg12_gravitational-currents-the-life-magic/) exhibition at the [Empty Gallery Hong Kong](https://emptygallery.com) an exhibition of works by [Susanne Winterling](http://www.susannewinterling.com). It is a part of an artistic research project by Susanne that explores planetary sensing navigations below the surface. The device is based on a design by [Shan He of Public Lab](https://publiclab.org/notes/shanlter/06-08-2017/knowflow-automatic-water-meter) in cooperation with the folks at [DF Robot](https://www.dfrobot.com).

## Parts

The following part list is based on what was available in Berlin. The DF Robot parts were mail-ordered. The rest of the parts were procured locally from Condor, an electronics/hobby shop, and Bauhaus, a hardware store.

<table>
    <thead>
        <tr>
            <th>Description</th>
            <th>Vendor</th>
            <th>EUR</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Gravity: I2C SD2405 RTC Module</td>
            <td>DF Robot</td>
            <td class="num">7.31</td>
        </tr>
        <tr>
            <td>SD/MicroSD Memory Card (8 GB Class10 SDHC)</td>
            <td>DF Robot</td>
            <td class="num">8.46</td>
        </tr>
        <tr>
            <td>Gravity: Waterproof DS18B20 Sensor Kit</td>
            <td>DF Robot</td>
            <td class="num">6.38</td>
        </tr>
        <tr>
            <td>Bluno - An Arduino Bluetooth 4.0 (BLE) Board</td>
            <td>DF Robot</td>
            <td class="num">42.33</td>
        </tr>
        <tr>
            <td>Gravity: Analog pH Sensor / Meter Kit For Arduino</td>
            <td>DF Robot</td>
            <td class="num">25.08</td>
        </tr>
        <tr>
            <td>Gravity IO Expansion Shield for Arduino V7.1</td>
            <td>DF Robot</td>
            <td class="num">7.57</td>
        </tr>
        <tr>
            <td>Gravity: Analog Sensor Cable for Arduino (10 Pack)</td>
            <td>DF Robot</td>
            <td class="num">5.10</td>
        </tr>
        <tr>
            <td>MicroSD card module for Arduino</td>
            <td>DF Robot</td>
            <td class="num">4.42</td>
        </tr>
        <tr>
            <td>Gravity: Digital Sensor Cable For Arduino (10 Pack)</td>
            <td>DF Robot</td>
            <td class="num">5.10</td>
        </tr>
        <tr>
            <td>Gravity: Analog Signal Isolator</td>
            <td>DF Robot</td>
            <td class="num">16.96</td>
        </tr>
        <tr>
            <td>discount</td>
            <td>DF Robot</td>
            <td class="num">-12.87</td>
        </tr>
        <tr>
            <td>Customs duty</td>
            <td>DHL</td>
            <td class="num">37.17</td>
        </tr>
        <tr>
            <td>LogiLink waterproof electic box</td>
            <td>Lets-Sell</td>
            <td class="num">13.95</td>
        </tr>
        <tr>
            <td>Ladegerat V-Charge 1000</td>
            <td>Conrad</td>
            <td class="num">12.99</td>
        </tr>
        <tr>
            <td>niedervolt stecker 2.1mm</td>
            <td>Conrad</td>
            <td class="num">3.79</td>
        </tr>
        <tr>
            <td>7.4v Eco-Line Lipo akku</td>
            <td>Conrad</td>
            <td class="num">17.99</td>
        </tr>
        <tr>
            <td>PVC quadratrohr</td>
            <td>Bauhaus</td>
            <td class="num">4.70</td>
        </tr>
        <tr>
            <td>PVC rechteck-U</td>
            <td>Bauhaus</td>
            <td class="num">2.25</td>
        </tr>
        <tr>
            <td>PVC winkel</td>
            <td>Bauhaus</td>
            <td class="num">2.20</td>
        </tr>
        <tr>
            <td>spezialkleber</td>
            <td>Bauhaus</td>
            <td class="num">2.79</td>
        </tr>
        <tr>
            <td>Flügel mutter</td>
            <td>Bauhaus</td>
            <td class="num">4.24</td>
        </tr>
        <tr>
            <td>FL-K-SCHR schlitz</td>
            <td>Bauhaus</td>
            <td class="num">2.40</td>
        </tr>
        <tr>
            <td>sechskant muttern</td>
            <td>Bauhaus</td>
            <td class="num">1.95</td>
        </tr>
        <tr>
            <td>kunstoff schrauben</td>
            <td>Bauhaus</td>
            <td class="num">1.40</td>
        </tr>
        <tr>
            <td>plexiglas</td>
            <td>Bauhaus</td>
            <td class="num">15.95</td>
        </tr>
        <tr>
            <td>USB-datenkabel</td>
            <td>Conrad</td>
            <td class="num">6.99</td>
        </tr>
        <tr>
            <td>losterklemme</td>
            <td>Conrad</td>
            <td class="num">1.39</td>
        </tr>
        <tr>
            <td>Lipo sensorkabel</td>
            <td>Conrad</td>
            <td class="num">4.19</td>
        </tr>
        <tr>
            <td>helatape flex schwarz</td>
            <td>Conrad</td>
            <td class="num">1.79</td>
        </tr>
        <tr>
            <th>total</th>
            <th></th>
            <th class="num">253.95</th>
        </tr>
    </tbody>
</table>