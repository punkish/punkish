---
title      : Astronomy Data Chain
description: 
modified   : 2012-04-23 10:16:00
created    : 2012-04-23 10:16:00
viewcount  : 0
id         : 569
gmap       : 
tags       :
    - data chains
stars      : 
---

Raw astronomical data obtained from a telescope looks quite different from the pretty images shown in, for example, the [Astronomy Picture of the Day][1]. The data chain from the sensor to what we see utilizes different procedures based on the technologies used to observe different parts of the electromagnetic spectrum, and every instrument has its own little quirks. [Andrew Schechtman-Rook][2] details a basic process that converts raw data to science quality infrared images is as follows:

- Readings from an array of sensors holding data about the number of photon strikes is read and stored on the hard drive of a computer in the form of a 2D array (see below for a snipped of such data):
	
		2.5980e+03 2.4610e+03 2.7280e+03 2.6290e+03 2.4250e+03 2.5750e+03 
		2.4310e+03 2.5510e+03 2.6230e+03 2.6660e+03 2.5190e+03 2.5170e+03 
		2.4480e+03 2.4300e+03 2.6680e+03 2.5940e+03 2.5410e+03 2.6320e+03 
		2.7370e+03 2.5580e+03 2.5130e+03 2.5920e+03 2.4770e+03 2.5580e+03 
		2.6200e+03 2.4760e+03 2.8010e+03 2.6500e+03 2.5480e+03 2.4970e+03 
		2.6690e+03 2.5620e+03 2.7500e+03 2.7330e+03 2.5630e+03 2.6620e+03 
		2.5880e+03 2.4920e+03 2.7200e+03 2.7620e+03 2.4730e+03 2.6770e+03 
		2.6490e+03 2.6000e+03 2.6430e+03 2.6570e+03 2.6430e+03 2.6640e+03 
		2.7420e+03 2.5820e+03 2.5640e+03 2.7880e+03 2.6080e+03 2.6520e+03 
		2.4480e+03 2.5530e+03 2.5930e+03 2.7200e+03 2.4830e+03 2.8780e+03 
		2.5790e+03 2.5210e+03 2.7190e+03 2.8270e+03 2.5210e+03 2.8170e+03 
		2.6170e+03 2.6800e+03 2.6800e+03 2.8330e+03 2.5530e+03 2.7620e+03 
		2.7250e+03 2.6040e+03 2.6550e+03 2.8200e+03 2.7040e+03 2.7110e+03 
		2.6490e+03 2.7060e+03 2.7570e+03 2.7190e+03 2.6760e+03 2.7600e+03 
		2.6150e+03 2.4400e+03 2.7930e+03 2.7610e+03 2.5670e+03 2.6940e+03 
		2.5230e+03 2.6420e+03 2.8000e+03 2.6710e+03 2.6150e+03 2.7560e+03 
		2.5730e+03 2.6040e+03 2.6130e+03 2.7620e+03 2.6100e+03 2.7240e+03 
		2.5070e+03 2.6130e+03 2.6110e+03 2.7940e+03 2.6460e+03 2.8550e+03 
		2.6390e+03 2.5940e+03 2.7360e+03 2.7930e+03 2.6090e+03 2.7930e+03 
		2.6910e+03 2.6930e+03 2.7900e+03 2.7220e+03 2.6350e+03 2.7100e+03 

 	A matching header file describing the conditions of the observation (exposure time, date of observation, filter used, etc) is also written to disk.
 
- The raw data, in the form of integers in this array, does not match up exactly with the number of photons measured by the detector. The difference is known and corrected for.

	![raw image](NGC4565_J_top_raw.jpg =640x400)  
	
- The response (sensitivity to light) of the detector is non-uniform in other ways as well. To correct for this the detector is exposed to a uniform ('flat') source of light several times during the day either before or after the observations are taken. These images are averaged together, and the science images are then divided out by this 'flat field' to correct the detector response.

	![combined flat field](NGC4565_J_top_flat.jpg =680x484)  

- In the infrared the amount of background light from the sky can change on very short timescales (on the order of minutes). Additionally, most current infrared detectors suffer from significant amount of faulty detector elements. Both of these reasons mean that many exposures are taken at different positions around an object (or in some cases, a fraction of the exposures are in a dedicated 'sky' field away from the object). Medianing these images together removes any contribution from astronomical sources leaving an image of just the sky background, which is then subtracted from the object images.

	![sky background image](NGC4565_J_top_skyimg.jpg =680x484)  
	
- Finally, all images of a single object in a given filter are combined together. This process, which can frequently involve 100+ individual images, removes detector defects, increases the field-of-view, and reduces the noise level in the final 'mosaicked' image. These images are now ready to be analyzed (and/or shown to the public).

	![combined stacked image](NGC4565_J_top_mosaicked.jpg =680x433)  
	

[1]: http://apod.nasa.gov/apod/
[2]: http://www.astro.wisc.edu/our-people/graduate-students/schechtman-rook/