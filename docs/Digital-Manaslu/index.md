---
title      : Digital Manaslu
description: 
modified   : 2016-09-21
created    : 
viewcount  : 91
id         : 35
gmap       : 
tags        :
    - geotagging
    - photos
    - Göttingen
stars      : 
---

SUB has received a unique collection of analog photos (prints and slides) from various expeditions to Nepal undertaken over a period of time—a legacy of Professor Matthias Kuhle. Curation is being carried out jointly with the Department of Geosciences at the University of Göttingen. These are invaluable photos because they offer a time-series view (repeated expeditions to the same locations over many years) at a very high resolution. However, while we have the time when the photos was taken, there is no geolocation available for these photos, that is, where the photographer was standing and which way he was looking when he took these photos. This short paper examines the various approaches to geolocate the photos, pin them on a map of the region, and make them available for dissemination.

## Step 1: Digitize the Photos

The first step is to digitize the photos. Digitization is a one-time investment, so we want the best digitization possible (but no more than necessary), and then down-sample for application-specific use. Digitization is an essential step and the subsequent steps depend on it. This can be spun off as a separate project for the dual objectives of archival and research, hence, funding for this step could be sought from different agencies. The subsequent steps of identifying/locating and displaying/disseminating are dependent on digitization of the photographs, however, these steps don’t have to wait for digitization of all photographs to finish. Even a small corpus of photographs that have already been digitized should be enough to start steps 2a and 2b. These steps themselves are not dependent on each other as they can be developed concurrently. Together, they do, however, set up a feedback loop whereby the identification and location of the displayed photos can be continuously improved until determined to be good enough.

## Step 2: Identify and Locate

Multiple strategies may be followed for identification and location. And since display and dissemination are a part of the process of identification and location, the two activities can be conducted concurrently in a dependent system of continuous feedback and improvement. The current method of one person using the process of visually identifying geographic features on a web-based map (such as Google Maps) and using that to mark the photos is extremely painstaking and time-consuming. We need to enlist a combination of crowdsourcing, location match and machine-learning to create a bigger dataset quickly, and then apply the secondary step of expert checking and confirmation.

### 2a. Crowdsource

The idea behind this is to enlist a crowd to do what one person is doing right now. The mechanism is quite like the current way of identification/location—present a photo and a web-based satellite view side-by-side, and have a user mark the correct location. Even if a certain percentage of the identification/location results may be wrong, given a big enough crowd, the decision will converge toward a truth that can be verified by an expert. There are few web-based platforms, listed below, that may allow us to construct such a project.

#### 2a.1. Crowdcrafting

Crowdcrafting is a web-based service that invites volunteers to contribute to scientific projects developed by citizens, professionals or institutions that need help to solve problems, analyze data or complete challenging tasks that can’t be done by machines alone, but require human intelligence. The platform is 100% open source - that is its software is developed and distributed freely - and 100% open-science, making scientific research accessible to everyone.

#### 2a.2. Zooniverse

The Zooniverse is the world’s largest and most popular platform for people-powered research. This research is made possible by volunteers—hundreds of thousands of people around the world who come together to assist professional researchers. Our goal is to enable research that would not be possible, or practical, otherwise.

#### 2a.3. Scribe Project

Scribe, built upon Zooniverse, is a highly configurable, open source framework for setting up community transcription projects around handwritten or OCR-resistant texts. Scribe is particularly geared toward digital humanities, library, and citizen science projects seeking to extract highly structured, normalizable data from a set of digitized materials (e.g. historical manuscripts, account ledgers, catalog cards, or maritime logbooks).

### 2b. Location Match

#### 2b.1. Hey What’s That

You hike to the top of a mountain or pull off at a scenic overlook. You see mountains in the distance. Which mountains are they? HeyWhatsThat will tell you, providing a 360° panoramic sketch labeled with the names of the peaks you're looking at. From almost anywhere in the world. Also available for smartphones.

#### 2b.2. Peak.AR

Peak.ar demonstrates the augmented reality technology that was developed in the course of a research project. It is a very flexible tool that can be used to visualize any kind of geo-referenced data. At the same time it is the most intuitive way for interfacing with complex data from a user’s perspective – just point your phone to some real world object and it will tell you everything it knows about it. 

#### 2b.3. PeakFinder

The mountains are calling! Explore more mountains than any mountaineer! PeakFinder Earth makes it possible... and shows the names of all mountains and peaks with a 360° panorama display. This functions completely offline – and worldwide! PeakFinder knows more than 250’000 peaks - from Mount Everest to the little hill around the corner. Also mobile.

### 2c. Machine Learning

This is the most ambitious approach, and it involves utilizing high-performance computing and deep-learning to match a corpus of photos against a training set which could be from user-contributed photos from Flickr and Instagram as well as from both appeals to general public and targeted expeditions that capture extensive imagery using a backpack-mounted camera rig. The basic idea is to match known locations photos with the photos that don’t have location. If a substantive match is found, then we know the location. If and exact match is not found then we continue matching, making the selection set smaller until we find a good enough match.

## Step 3: Display and Disseminate

### Examples for Inspiration

#### Map Warper

The NYPL Map Warper is a tool for digitally aligning ("rectifying") historical maps from the NYPL's collections to match today's precise maps. Visitors can browse already rectified maps or assist the NYPL by aligning a map. Play the video above to tour the site and learn how to rectify a map yourself. Everyone is welcome to participate!

#### OLD NYC 

Mapping historical photos from the NYPL. This site provides an alternative way of browsing the NYPL's incredible Photographic Views of New York City, 1870s-1970s collection. Its goal is to help you discover the history behind the places you see every day.

#### Digital Collections

Explore 695,287 items digitized from The New York Public Library's collections. This site is a living database with new materials added every day, featuring prints, photographs, maps, manuscripts, streaming video, and more.

#### Building Inspector

For years The New York Public Library has collected maps documenting our ever-changing metropolis. Originally commissioned by insurance companies to assess property value and fire risk, these street atlases contain a wealth of detailed information about a city now largely lost to us: buildings long ago destroyed, streets renamed, whole neighborhoods redrawn or redefined. Making these lost places findable via contemporary digital maps allows us to drill down through the layers of urban change and study the city in profound new ways. But harvesting the data isn't easy.

That's where the Building Inspector (and you) come in. This app is the latest in a series of public-facing tools designed by The New York Public Library Labs to extract, correct and analyze data from historical maps. We're training computers to do the heavy lifting, and then distributing the remaining quality control tasks to smart, conscientious citizens like you. The goal? To produce a comprehensive directory of old New York (or, as we like to think of it, a time machine).

#### Space Time

The New York Public Library is planning a major civic initiative aimed at turning historical maps and other geographic sources into a digital time-travel service for New York City.

#### Public Domain Visualization

On January 6th, 2016, The New York Public Library made over 187K digital items in the public domain available for high resolution download. This is one of many experiments by the NYPL Labs to help patrons understand and explore what was contained in that release.

## Resources

### Code Repos

#### New York Public Library

Based dually at the Library’s landmark central branch on 42nd Street and at its cutting-edge services center in Long Island City, [NYPL Labs](https://github.com/NYPL-publicdomain) is an interdisciplinary team working to reformat and reposition the Library's knowledge for the Internet age. Labs combines core digital library operations (digitization, metadata, permissions/reproductions, etc.) with a publicly engaged tech, design, and outreach team focused on enabling new uses of collections and data, collaborating with users on the creation of digital resources, and applying new technologies to library problem-solving.

### Cloud Services

#### Amazon Earth

Build planetary-scale applications in the cloud with open geospatial data on [Amazon Earth](https://aws.amazon.com/earth/). AWS Cloud Credits for Research are available for anyone to conduct research using Earth Observation data on AWS. Students, educators, and researchers are key drivers of technological innovation and we want to support new advances in the field.

#### Google Earth Engine

A planetary-scale platform for earth science data and analysis, [Google Earth Engine](https://earthengine.google.com) combines a multi-petabyte catalog of satellite imagery and geospatial datasets with planetary-scale analysis capabilities and makes it available for scientists, researchers, and developers to detect changes, map trends, and quantify differences on the Earth's surface.
Other Tools

#### GpsPrune

[GpsPrune](http://activityworkshop.net/software/gpsprune/) is an application for viewing, editing and converting coordinate data from GPS systems letting you play with your GPS data after you get home from your trip. It can load data from arbitrary text-based formats (for example, any tab-separated or comma-separated file) or Xml, or directly from a GPS receiver. It can display the data (as map view using openstreetmap images and as altitude profile), edit this data (for example delete points and ranges, sort waypoints, compress tracks), and save the data (in various text-based formats). It can also export data as a Gpx file, or as Kml/Kmz, or send it to a GPS receiver. Example uses of GpsPrune include cleaning up tracks by deleting wayward points - either recorded by error or by unintended detours. It can also be used to compare and combine tracks, convert to and from various formats, compress tracks, export data to Google Earth, or to analyse data to calculate distances, altitudes and so on.

