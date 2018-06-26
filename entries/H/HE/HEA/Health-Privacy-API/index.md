---
title       : A Health Privacy API  
description :   
modified    : 2016-05-26 08:32:00  
created     : 2016-05-26 08:32:00  
viewcount   : 0  
id          : 24  
gmap        :   
tags        :
    - privacy
    - security
    - health
    - health data
stars       :   
---

***An addendum:*** *Most folks must have heard about [Viv](http://viv.ai) by now, the new “intelligent voice-assistant” from the original creators of Siri. It is interesting that they tout the following byline: “INTELLIGENCE BECOMES A UTILITY” (their all-caps). What I am dreaming of here is privacy/security as a utility.*

For the past year and a half I have been working on health/medical information from the edges going in. There is nothing structurally unique about information in this domain. For example, it is not like geospatial information, and that too ceased being different once we figured out how to store it in relational (and now even key-value) databases and create structured queries against it. The two things that do make the domain of health/medical information unique are social: one is consent, and the second is the ethical and regulatory requirements to deal with its security and privacy aspects. And both those requirements are not like the first-sale doctrine in that the consent, privacy and security considerations of the information source have to be respected by not just the first user but by all secondary users.

I wrote up a small note on a [perfect health repo desiderata](/Perfect-Health-Repo-Desiderata), and one of those requirements (see #15 in the aforementioned post) would be to assist the information contributor to determine what privacy and security regimes apply to the contribution. One way to do that would be to have a service that asks a few simple [^1] questions and then suggests a course of action.[^2] Sadly, it seems that [Data Tags](http://datatags.org) may not have a future, but the need remains unfulfilled.

Just like rationalized, harmonized and simplified consent, TOS/TOU, DUA and other policies, that are not only important but also desired by many players in the field, the kind of privacy/security service that I describe above too is actually desired and needed by the researchers in the medical/health field. This is a real need, and it would be best served by a service provided via an API.

[^1]: ok, not a few and perhaps not that simple.
[^2]: even better if the service can also perform the suggested course of action.
