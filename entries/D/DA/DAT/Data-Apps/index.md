---
title      : Data Apps
description: the way to share
modified   : 2016-10-05 13:51:00
created    : 2016-10-05 13:51:00
viewcount  : 0
id         : 232
gmap       : 
type       : presentation
layout     : presentation
tags       :
    - presentation
    - science
    - data apps
stars      : 
style      : inverse
notes      : Don't make web apps, make data apps.
---

name: inverse
layout: true
class: inverse, left, top

---

## In the beginning, there was a scientist working on her data on her computer with the help of an app on her computer.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/001.jpeg" width="100%">

---

## Then she made a web app, and other scientists could see her data,  but only what she made available and the way she made it available.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/002.jpeg" width="100%">

---

## So, she made a data app that published her data. And, she became a client for her data app and made a web app.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/003.jpeg" width="100%">

---

## Now, others could not only see her data through her web app, they could also see her data app. They liked this idea, and did the same.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/004.jpeg" width="100%">

---

## Others liked the idea and joined the party. Some made only web apps, others made only data apps, while yet others made both, and even more only used them.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/005.jpeg" width="100%">

---

## They continued to work the way they always did, without changing their tools and technology. No one placed any demands on another, no one’s burden was increased.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/005.jpeg" width="100%">

---

## The only tacit agreement was that they all agreed to adhere to very minimum and easy standards for building data apps because they recognized the benefit of doing so.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/005.jpeg" width="100%">

---

## So, how does this all work? A desire to make one’s data accessible by others, and a common understanding to follow a few very lightweight standards.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/008.jpeg" width="100%">

---

## Every one is free to continue to use what they are already using. No one has to change their mode of work or their favorite technology.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/009.jpeg" width="100%">

---

## We depend on Representational State Transfer (REST) as the architectural style and JavaScript Object Notation (JSON) as data transport format.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/010.jpeg" width="100%">

---

## No one is obligated to provide their data to anyone, and no one is beholden to anyone. The only concession is to adhere to a common interface.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/011.jpeg" width="100%">

---

## When a user finds some one else’s  data useful, the two form a relationship.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/012.jpeg" width="100%">

---

## If the other user finds use for the first user’s data, well, that is even better as the relationship is symbiotic.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/013.jpeg" width="100%">

---

## Given a large number of users participating in this way of opening up their data, everyone will benefit from someone’s work.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/014.jpeg" width="100%">

---

## But, it will be even better if the data publisher could keep count of how many users took the data.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/015.jpeg" width="100%">

---

## Since access to the data, be it via the web or through the command line, is exclusively via a web server, the publisher always knows the use count.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/016.jpeg" width="100%">

---

## With no middleman, it is easy to track when B uses A’s data as B leaves information in A’s logs. 

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/017.jpeg" width="100%">

---

## But, what would happen if C takes A’s data from B? That is a difficult problem worth solving. No answer yet, but more on that soon.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/018.jpeg" width="100%">

---

## A complementary issue is for the user to know what can be done with the data.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/019.jpeg" width="100%">

---

## What can be done with the data is usually driven by what the data publisher permits.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/020.jpeg" width="100%">

---

## Most scientific data may already be in the public domain. Yet, it is a good practice to publish the data with a data license accompanying all data packets.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/021.jpeg" width="100%">

---

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/022.jpeg" width="100%">

---

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/023.jpeg" width="100%">

---

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/024.jpeg" width="100%">

---

### Make your data available.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/025.jpeg" width="100%">

--

### Always serve your data via a web server.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/026.jpeg" width="100%">

--

### Always create a data app first.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/027.jpeg" width="100%">

--

### Build other apps on top of the data apps.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/028.jpeg" width="100%">

---

### Your data is a resource.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/029.jpeg" width="100%">

--

### Make your resource identifiable by a unique name.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/030.jpeg" width="100%">

--

### This is the Uniform Resource Identifier (URI).

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/031.jpeg" width="100%">

---

## Cool URIs don’t change. This is your contract to your community.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/032.jpeg" width="100%">

---

## Because each scientist speaks a different language, we need a common interface to connect everyone.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/033.jpeg" width="100%">

---

## Our common interface is the hypertext transfer protocol (http) and its limited set of verbs such as GET, PUT, DELETE, POST.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/033.jpeg" width="100%">

---

## Our data transfer format of choice is JavaScript Object Notation (JSON), *where possible*.

<img class="bottom" src="/data/D/DA/DAT/Data-Apps/034.jpeg" width="100%">

---

### You and others can do more with raw data than with cooked data.

--

### Think data apps that publish raw data. (raw up to the level it makes sense)

--

### Each datum is a resource.

--

### Each resource has a unique name.

--

### And, is accessible by a canonical URI.

--

### Choose JSON (or other format) for data transfer.

--

### Provide a few standard resources for discovery

- author
- version
- license
- resources

---
