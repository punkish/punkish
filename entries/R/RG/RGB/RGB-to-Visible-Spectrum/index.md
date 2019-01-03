---
title      : RGB to Visible Spectrum 
description: 
modified   : 2019-01-03 10:09:00
created    : 2019-01-03 10:09:00
viewcount  : 0
id         : 662
gmap       : 
tags       :
    - DIY
    - CUBE
    - HBCSE
    - open hardware
    - code
stars      : 
layout     : canvas
template   : canvas
js         : script
---

<canvas>RGB values to wavelengths of visible light</canvas>

The spectrum is generated using approximate RGB values for visible wavelengths between 380 nm and 780 nm. The red, green and blue values (RGB) are assumed to vary linearly with wavelength (for GAMMA=1).

Original [FORTRAN code](http://www.physics.sfasu.edu/astro/color/spectra.html) converted to JavaScript

```JavaScript
function wl(i) {
    let r = 0;
    let g = 0;
    let b = 0;
    let gamma = 0.80;
    let depth = 255;

    if (i >= 380 && i <= 440) {
        r = -1 * (i - 440) / (440 - 380);
        b = 1;
    }
    else if (i >= 440 && i <= 490 ) {
        g = (i - 440) / (490 - 440);
        b = 1;
    }
    else if (i >= 490 && i <= 510 ) {
        g = 1;
        b = -1 * (i - 510) / (510 - 490);
    }
    else if (i >= 510 && i <= 580 ) {
        r = (i - 510) / (580 - 510);
        g = 1;
    }
    else if (i >= 580 && i <= 645 ) {
        r = 1;
        g = -1 * (i - 645) / (645 - 580);
    }
    else if (i >= 645 && i <= 780 ) {
        r = 1;
    }

    // LET THE INTENSITY SSS FALL OFF NEAR THE VISION LIMITS
    let sss;
    if (i > 700) {
        sss = 0.3 + 0.7 * (780 - i) / (780 - 700);
    }
    else if (i < 420) {
        sss = 0.3 + 0.7 * (i - 380) / (420 - 380);
    }
    else {
        sss = 1;
    }

    // GAMMA ADJUST AND WRITE IMAGE TO AN ARRAY
    return [
        Math.floor(depth * ((sss * r) ** gamma)),
        Math.floor(depth * ((sss * g) ** gamma)),
        Math.floor(depth * ((sss * b) ** gamma))
    ]
}
```