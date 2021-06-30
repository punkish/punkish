---
title      : Stable Isotope Biogeochemistry Data Chain
description: 
modified   : 2011-10-27 22:57:00
created    : 2011-10-27 22:57:00
viewcount  : 0
id         : 569
gmap       : 
tags        :
    - data chains
stars      : 
tmpl       : 2_cols
ui			: 
---

The photosynthetic process converts carbon dioxide (CO<sub>2</sub>) into biolipids in the cyanobacteria in the ocean. When these bacteria die, they fall into the sediment and become fossil. Over the course of millions or billions of years, the rock goes through transformations which may change the chemistry of the fossil. [Dr. Kenneth H. Williford][kw] studies these processes by examining cyanobacteria in the rock record. Biochemistry tends to concentrate <sup>12</sup>C inside the organism instead of <sup>13</sup>C. Measuring the extent to which that happens can give us an idea of the metabolic strategy, *aka* the photosynthetic strategy, of the organism. Here is Dr. Williford's data chain:

[kw]: http://www.geology.wisc.edu/~kwilliford/ "Dr. Kenneth H. Williford"

* Get a chunk of rock that is most likely to have the fossil of interest.

* Rock is cut into small chips the size of a razor blade, about a centimeter thick. The exposed side is polished, mounted on a glass slide, ground down to anywhere from less than a millimeter to the thickness of a sheet of paper -- in other words, a thick thin-section.

* Using an optical microscope at 10x to 100x, the section is scanned for fossil bacteria. Wherever the bacteria are located, the section is ground more so the bacteria intersect the surface and are exposed.

* The section is examined under a scanning electron microscope (SEM) to determine the distribution of carbon (C). The backscattered electrons is measured, because the electrons scatter differently based on the chemistry of what they hit. The output from the SEM are high resolution (2560 px x 1950 px) TIFF images with grey scale values of the pixels proportional to the average atomic number of the substance at the sample surface.

* An energy dispersive spectrometer is used to measure the energy of X-rays emitted by different elements hit by an electron beam. This helps create a chemical map showing the elemental chemistry of the sample, an image of the topography of the surface, and an image of the location of C.

* The sample is then put in a [secondary ion mass spectrometer][sm] (SIMS) which fires a "primary beam" of cesium (Cs<sup>+</sup>) ions on the surface of the sample. The Cs<sup>+</sup> beam is 1 to 20 micrometers in diameter and has to be aimed precisely at the sample. The beam digs micro pits in the surface of the sample. This "sputtering" knocks off ions from the surface of the sample. The ions (e.g. <sup>12</sup>C<sup>-</sup>, <sup>13</sup>C<sup>-</sup>) are accelerated away from the surface, focused into a "secondary ion beam," and propelled past a large magnet. The ions are separated by mass with the help of this magnet. <sup>13</sup>C<sup>-</sup> ions, which are roughly 1% of the total C ions, have slightly more mass and are deflected less than <sup>12</sup>C<sup>-</sup> ions. CIPS, the software running on SIMS, is proprietary.

[sm]: http://www.geology.wisc.edu/~wiscsims "Secondary Ion Mass Spectrometer"

* The <sup>12</sup>C<sup>-</sup> and <sup>13</sup>C<sup>-</sup> are focused towards the detector end of the SIMS where there are Faraday cups (FC) as well as electron multipliers (EM). An EM is used when there is very little of the material being analyzed (for example, <sup>13</sup>C<sup>-</sup> in the microfossils). An FC is preferable because it is easier to work with and has fewer side effects than an EM. When beam of ions hits the FC, it generates a current, which is converted voltage that is measured and converted into a count of ions that struck the FC. This count is really a rate telling how many ions hit the FC during the time period of experiment (for example, the number of hits during 80 cycles of 1 second each).

* The isotope ratio (<sup>13</sup>C<sup>-</sup> counts to <sup>12</sup>C<sup>-</sup> counts) for each cycle, the mean ratio, and two standard errors are calculated.

* The isotope ratio is entered in a MS-Excel spreadsheet which has macros that convert the ratio to a delta value by comparing it to the known ratio of a standard material such as a sea shell which is representative of the composition of the ocean.

* The raw delta number measured by the SIMS still does not tell us the composition of the material because of measurement biases occurring inside the instrument. These readings are corrected by making measurements of a material whose isotopic composition is known, bracketing 10 analyses of the sample with 4 analyses of the standard on either side (total 8 analyses of the standard).

* The spreadsheet then give us the raw isotope ratio, standard error (internal precision), count rate of the ions, and primary beam intensity.
