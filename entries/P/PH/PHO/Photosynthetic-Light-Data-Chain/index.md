---
title      : Photosynthetic Light Data Chain
description: 
modified   : 2011-10-24 14:08:00
created    : 2011-10-24  14:08:00
viewcount  : 0
id         : 569
gmap       : 
tags        :
    - data chains
stars      : 
tmpl       : 2_cols
ui			: 
---

[Natalie Hunt][nh] studies agroecosystems to determine how light is assimilated into the crop canopy to become biomass using measurements of photosynthetically active radiation (PAR). These field measurements are validated against farmer reported yields. Here is her data chain:

[nh]: http://forestecology.forest.wisc.edu/hunt.html "Natalie Hunt"

* Sites are selected based on differing soil types, landowner access permission, crop types (i.e. corn or soybean planted this year), and location within a larger pre-identified study region.

* Shortly after crops are planted and before plant emergence occurs, light sensors (Li-Cor LI-191SA Line Quantum Sensor) are installed in the study field.  

	![photosynthetically active radiation](par.jpg w=400 h=300)
    image courtesy Natalie Hunt under a CC-BY 3.0 License

Three sensors are situated on the ground, and one is perched atop a tower approximately four meters off the ground.  The sensors collect the amount of light within the photosynthetically active portion of the light spectrum (400 - 700 nm) that falls on the sensor on a continual basis throughout the growing season (photon density * m<sup>-2</sup> * s<sup>-1</sup>).  Edaphic characteristics including soil temperature and soil moisture are also recorded using a thermocouple soil temperature probe and a Theta soil moisture probe.

* All data are recorded to the internal memory of a Campbell Scientific CR23X data logger.  The data are collected every ten seconds, then averaged to record continuous hourly data from the time of installation (post-planting) until extraction (shortly before crop harvest).  

* On a weekly basis, the sites are visited and data are downloaded from the datalogger to a Toughbook laptop computer using the `LoggerNet` program.  A field notebook is also kept to record crop observations (e.g. crop height and condition) and any noted anomalies with the field equipment (for example, sensor run over by tractor, crane sitting on light sensor. cables chewed through, tower knocked over by wind, etc.).  These observations are later checked against the sensor data to identify and flag erroneous values in the dataset.

* The data are then transferred to the lab computer from the Toughbook and backed up on a department server and external hard drive.

* Data are processed and analyzed using R statistical software.  Biomass for each field site is calculated and validated against farmer reported yields.  Plots and charts are also produced using R.

