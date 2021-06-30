---
title      : Dashboard Data Model
description: 
modified   : 2007-02-17 00:00:00
created    : 2007-02-17 00:00:00
viewcount  : 2
id         : 116
gmap       : 
where      : Seagrant Institute, University of Wisconsin-Madison
when       : February 2007
tags       :
    - presentation
stars      : 
notes      : A small presentation on data models that can be repurposed for many different end-uses.
---

## Our Data Flow

*   Our data model
    * USGS raw data → webservice → our db → events analysis → dashboard
*   If someone else, were doing the bit shown above already, I could imagine 
    something like
    * USGS raw data → webservice → other db for a bunch of different things 
      including events analysis → webservice → dashboard
*   Or, if we were supporting a whole bunch of other applications
    * I could imagine utilizing the common data model so other applications 
      could also benefit

???

some notes

---

## Data Storage

*   Our storage is rather simple
*   At its core it is very much what the USGS gives us
*   We just tack on a few additional bits of info such as whether or not a given 
    reading is a part of an event, if yes, then which event, and so forth

---
   
## Simple Process

*   USGS gives us only so much data, so we ask them one-off to fill the well, 
    and then we keep on topping off the well as time goes by.
*   We are just grabbing the raw, fixed width gage data through a standard http 
    query ("web service" call it if you will), not a web scrape.
*   We have standardized on a published web service: it is called "USGS NWIS 
    data feed"
*   The USGS feed we are using is not XML
    * It is just plain, vanilla, fixed width ASCII text. As long as they don't 
      change anything about it, it is the best, fastest, simplest to work with

---
   
## Non-USGS gages

*   There probably no standards for these non-USGS gages to follow.
*   If these gage operators are smart, they have adopted the USGS standards, but 
    in all probability "not."

---

## Events Analysis

*   MATLAB program is now a Perl program. Anyone is welcome to take that and do 
    what they want with it.

---
   
## Model, View, Controller

When thinking of computer programs, it is best to think in terms of the Model, View, Controller (MVC) approach. The data are the "model," the "view" can be a web-based application as in our case, or a desktop application, and the "controller" is used to describe the hooks between the view and the model. In our case, using the following legend: \[model in square brackets\] -> {view in curly brackets} -> (controller in parens), it would look like so

---

## Our MVC

*   [data] → {web programs} → (web pages)
*   The data model itself is really a succession of models, each using a view 
    and a controller to create a new model
    * [USGS raw data] → {program that grabs the feed} → (our 
      SQLite/PostGres repository)
    * [our SQLite/PostGres repository] → {program that analyzes for events} 
      → (data fit for visualization)
    * [data fit for visualization] → {program that extracts event data 
      based on user request} → (web page or Java applet or whatever)
    * There are other parallel MVC manifestations for us as well, for example, 
      Batzli's image repository, but the concept is the same.
