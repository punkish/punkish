---
title      : Seismology Data Chain
description: 
modified   : 2011-10-21 09:22:00
created    : 2011-10-21 09:22:00
viewcount  : 0
id         : 569
gmap       : 
tags       :
    - data chains
stars      : 
---

[Dr. Ellen Syracuse][es] works with seismic data. The seismic data that Dr. Syracuse uses starts at a sensor in the ground in, say, New Zealand, and ends up as waveforms/wiggles that she can see on her computer screen. Here is the data chain:

[es]: http://geoscience.wisc.edu/geoscience/people/staff/staff-member/?id=770 "Dr. Ellen Syracuse"

- ![Trillium](trillium40.jpg =96x96) Usually acquired from PASSCAL,[^1] a station consisting of a seismometer/sensor, GPS clock, digital recorder, power source, etc., is placed in a hole in the field.
- The sensor writes data to log files and data files
    - The log files contain information about system health, for example, possible timing problems identified when the system clock is significantly different from GPS time, power outages, sensor temperature, sensor lat, lng and elevation.
    - The data files contain information on the voltages supplied to each sensor component, that is, either vertical alone, or vertical plus two horizontal components.
- Secure Digital (SD) cards containing data are swapped manually, approximately monthly, and the data on the SD cards are copied to a computer for processing
- The raw RefTek[^3] data are converted to [SEED data][sd] by running `ref2mseed` or similar PASSCAL program
- To run `ref2mseed`, the scientist must provide the sample rate, for example, 100 samples per second, at which the data were recorded. The sample rate is defined when the station is installed.
- The scientist manually looks through the log files using the program `logpeek`, another  PASSCAL program, to identify any potential timing problems which can later be flagged in the finished database
- The scientist then runs `dbbuild`, a program that is a part of the [Antelope package][an] to build database tables that can be read using Antelope software and contain useful information about the stations such as location, station name, sample rate, experiment name, and dates of operation.
- Headers in SEED files are fixed using PASSCAL-written program `fixhdr`
    - The raw data are identified by a channel name and the serial number of the SD card to which the data were written. In `fixhdr`, a SD serial number is linked to the name of the station where it was installed, and the channel names to more meaningful names such as changing **1C1**, which is a meaningless channel name to a seismologist, to **HHZ**, which to a seismologist, contains information about the sensor and channel; **HH*- is a broadband seismometer that is sensitive to a certain range of ground motion frequencies, and **Z*- is the vertical component of the seismometer.
    - The scientist then runs `miniseed2days`, another Antelope program that takes the SEED files for each station and reformats them into [*miniseed*][mn] files, which are like SEED files, but do not contain any header information such as location, station name, and sample rate. This also creates an Antelope table that points to the miniseed files, and with a few mouse clicks, one can now view the waveforms from a particular station/channel/time period. This table can also be linked to those created using `dbbuild`.
- These steps give the person running the experiment either continuous waveforms for each station for the entire duration of the experiment, which they can they view however they want, for example, plot and process in [SAC][sc], Antelope, or Matlab.

[sd]: http://www.iris.edu/manuals/ "Standard for the Exchange of Earthquake Data"
[an]: http://www.iris.edu/manuals/antelope.htm "Antelope package"
[mn]: http://www.iris.edu/manuals/SEED_appG.htm "miniseed"
[sc]: http://www.iris.edu/manuals/sac/SAC_Home_Main.html "Seismic Analysis Code" 

From Dr. Syracuse's hands to where the waveform data are archived, the data follow the path below:

- The data are packaged into a .tar file for each station and sent via FTP to PASSCAL
- Once the data pass PASSCAL's quality control, someone at PASSCAL sends the data to the IRIS DMC[^2], where the data from the experiment are archived.

[ir]: http://www.iris.edu/dms/dmc/ "IRIS DMC"

From the IRIS DMC archive to a seismologist who is unaffiliated with the initial data collection, which would be any other person in the world:

- At the DMC, usually there is a two-year period during which only those involved with the experiment are allowed to access the data, but following PASSCAL's policy for experiments using their instruments, the data become publicly available after two years. Prior to this two-year deadline, the data from one station from the experiment are public.
- At any time after the DMC has the data, a user can go to and see [the experiments/stations/time periods for which the DMC has data][dt], even if the data aren't publicly accessible at this point
- If data are available, there are a variety of web- or email-based request tools such as [`breq_fast`][dt] to get data from a particular station and time period
- When a subset of data is ready, it is put on a FTP site, the user is notified via email, and they can download it
- The data can be converted to a useable format (generally either SEED or SAC) using the DMC-distributed program `rdseed`
    - If it is converted to SEED, one can then display or process it using an Antelope program.
    - If it is converted to SAC, one can read it into SAC, which is available only to the IRIS community.
    - Either way, one finally ends up with data files and is able to view them as wiggles on a screen

[dt]: http://www.iris.edu/SeismiQuery/day_f.html "Data Holdings by Station Query"

So far, no real seismology has happened. There is a wide variety of analyses seismologists might want to do with the data at this point. Here are the steps that one might take to solve for an earthquake location

- Either manually or automatically pick P and S (and many other phase) arrivals from the continuous data
    - You may use a program that scans the data to find signal above a certain threshold to identify earthquakes that have not been previously identified, or you may start with an earthquake catalog containing the times and locations of earthquakes that have already been identified by some agency, such as the USGS.
    - Within a small time window, let's say 1 minute, all the arrivals that have been picked from your network of stations are used to locate the earthquake in one of many possible location programs. You know the station distribution and the arrival times, and assume some velocity structure for the rocks surrounding the stations so that the raypaths from a possible earthquake location to the stations and the time that it takes P and S energy to travel along that path can be calculated.
    - The program solves for lat/lng/depth of the earthquake, as well as the time when it occurred. This is something that can then go into an earthquake catalog or be plotted on a map.

There's still a lot of other work that can be done at this point. For example:

- There will be some disagreement between the calculated and observed travel times for each earthquake at each station. Maybe the earthquake location isn't very accurate. Maybe the assumed velocity model is wrong or too simple. This is the basis of velocity tomography, which can give you information about changes in rock properties in a region.
- You can analyze the amplitude of the P and S arrivals at each station and determine the magnitude of the earthquake, or the attenuation structure of a region, which also gives information on rock properties.
- Ambient noise tomography is gaining popularity. Instead of looking at residuals from earthquake locations, you look at continuous signal and ignore the earthquakes - changes and correlations in the noise between different stations can also give you information on the subsurface.
- You can look for tremor - it is like earthquakes, but the signal is smaller and has an unclear onset. But if you stack the waveforms of tremor recorded at a single station, you can see that there is a definite signal. This can tell us about the different types of slip behavior along a fault. For example, a tremor happens in different places and through different processes than the brittle failure that causes earthquakes.

Also, some seismologists never actually look at or have access to waveforms. For example, Dr. Syracuse recalls requesting data from a group in Central America and they sent her a text file of earthquake locations and times, and a list of phase arrival times at Central American stations.

A plot you can look at:

![picks](picks.jpg =278x240)

- shows manual P and S arrivals for an earthquake in Central America displayed in Antelope. They are saved in an Antelope table, which is really a text file that's in a certain format. Each pick has the following information associated with it in the text file - absolute time, station, station channel, phase (P or S), ID number, and may have additional info, such as amplitude or uncertainty. If these were SAC files, this type of information would be stored in the header.

[^1]: <a href='http://www.passcal.nmt.edu/'>Program for Array Seismic Studies of the Continental Lithosphere</a>

[^2]: <a href='http://www.iris.edu'>Incorporated Research Institutions for Seismology</a>

[^3]: <a href='http://www.reftek.com/'>RefTek</a> makes most of the digital recorders that PASSCAL uses

