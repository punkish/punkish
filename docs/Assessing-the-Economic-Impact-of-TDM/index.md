---
title      : Assessing the Economic Impact of TDM  
description:   
modified   : 2015-10-12 18:17:00  
created    : 2015-10-12 18:17:00  
viewcount  : 0  
id         :  
gmap       :  
tags        :
    - TDM
    - project ideas
    - open science
    - publishing
stars      :  
---

Text and data mining (TDM) has many [definitions](/Legal-Implications-of-TDM?a=show#3), but we can reasonably agree that it is the <span class='hilite'>“use of automated methods for exploiting the enormous amount of knowledge available in the published literature meant primarily for human consumption.”</span>

Using Paul Romer’s endogenous growth theory,[^1] published literature, the raw material for TDM, is a non-rivalrous resource in that when someone uses it, it is not diminished for the next user. It is, however, an excludable resource, and decisions of excludability are determined by policy. Assessing the economic impact of TDM may provide policy makers one argument for removing excludability from published literature for the purpose of TDM.

But, how do we measure the economic impact of a TDM activity that is generally very new or niche? Here are a few ideas, assuming activity A uses TDM, and in come cases, it replaces activity B that was conducted without TDM.

First, we will assume that the economic impact of any activity is the revenue generated by that activity minus the cost of doing that activity. 

If A allows scientists to save time doing an existing task B, the money value of the time saved would be attributable to TDM, and would comprise the revenue of A. We can multiply the salary of the scientist by the number of hours saved to calculate this value.

The cost of A would hopefully be simpler to determine as that would be the cost of developing and then running A.

If A has resulted in a business or a service, the annual profit (revenue - cost) of that business could provide an estimate of the economic impact of A. We can express this as 

<code>
A<sub>ei</sub> = A<sub>rev</sub> - A<sub>cost</sub>
</code>

If A replaces B then the net economic impact of A will be its economic impact minus any economic impact of B. But what if A allows us to do something that couldn’t be done without TDM? In this case there is no B so there is no estimate for its cost, and the entire <code>TDM<sub>ei</sub></code> will be attributable to A. The following formula can be used to express this relationship.

<code>
TDM<sub>ei</sub> = A<sub>ei</sub> - B<sub>ei</sub>
</code>

As we can see, it is relatively easier to estimate cost savings of A if it replaces B. For example, Peter Murray-Rust, et. al., estimate that restricted access would cost a researcher almost two-thirds of her time just to get the appropriate permissions to mine text from journals in the UKPMC.[^2]

A non-quantifiable situation would be if A doesn’t replace an activity, and doesn’t result in a business. In this case it would be difficult to calculate its economic impact because while we can calculate its cost, we can’t calculate its benefit. In the Hargreaves report, the cost savings per annum for text and data analytics are not quantified, but it is estimated there would be “Social innovation, and longer term scope for major economic gains.”[^3]

## Paleobiology Database Example

Let us examine the Paleobiology Database (PBDB) through the lens of the above formula. PBDB is a database that has been developed over almost 15 years by contributions from hundreds of scientists around the world. The [PaleoDeepDive](http://www.youtube.com/watch?v=Cj2-dQ2nwoY) project aims to rebuild PbDB and even expand it via text mining. Since A is a relatively new activity, <code>A<sub>cost</sub></code> is easier to determine as it would be any funds spent on developing PaleoDeepDive. Also, since A is likely to be newer than B, records of spending may be easier to find.

<code>B<sub>cost</sub></code> is a lot harder to assess but some assumptions can be made. PBDB has a million+ entries (`n`). If recording each entry took `x` minutes, and if the cost of that time was `y` then building PBDB dataset cost `n * x * y`. Of course, there was also the cost of programming and improving the PbDB software itself. That is relatively easier to determine because its development was funded by an NSF grant to the tune of `N` dollars. So the estimated <code>B<sub>cost</sub></code> would be `N + (n * x * y)`. If data entry was done by researchers from around the world, which is actually the case with PBDB, then determining `y` may be difficult, but some assumptions could be made. As long as the assumptions and calculations are clearly recorded, fine-tuning the costs would be easier.

## Methodology

Since there is no standardized universal TDM activity, we would have to survey the research landscape as comprehensively as our budget would allow. We could go to the major funding sources such as regional or national science foundations and ask for a list of projects that mention TDM and then contact those researchers for more information.

## Limitations and Side Effects

There are several limitations evident in the above approach:

* We simply may not be able to survey all the TDM-based projects, and they may vary enough in their scope to make generalization erroneous. 
* It may be difficult to quantify the cost and the benefit of the activities. 
* We may not be able to identify all the commercial businesses and services that owe their existence to TDM.

Some of the positive side-effects of this exercise, even if it is off initially, would be the start of a useful inventory of TDM-based projects. As long as a the assumptions are described and quantified clearly, the assessment of the economic impact could be tweaked and made more precise as more information is obtained.

The bottomline is, some measure of economic impact assessment of TDM can and should be done. Impact assessments are difficult, and require a lot of guess-work, but they are necessary, and can pave the way for further understanding what we can do better, as demonstrated by the attempt to evaluate the "Impact Assessment of INSPIRE." [^4] The first attempt at conducting an EIA of TDM may not be perfect but, as stated above, <span class='hilite'>as long as the assumptions and calculations are clearly recorded, fine-tuning the costs would be easier.</span>

[^1]: Paul Romer. 1990. Endogenous Technological Change, <a href='https://ideas.repec.org/a/ucp/jpolec/v98y1990i5ps71-102.html' target='_blank'>Journal of Political Economy</a>, Vol. 98, No. 5, Part 2, pp. S71-S102.

[^2]: Murray-Rust, Peter, Jennifer C Molloy, and Diane Cabell. 2014. “Open Content Mining.” In Issues in open research data, Samuel A Moore (ed.), Ubiquity Press, London.

[^3]: Ian Hargreaves. 2011. “Digital Opportunity: a Review of Intellectual Property and Growth,” <a href='http://webarchive.nationalarchives.gov.uk/20140603093549/http://www.ipo.gov.uk/ipreview-doc-ee.pdf' target='_blank'>Supporting Document EE, Economic Impact of Recommendations</a>, 1–130.

[^4]: Max Craglia. 2003. “Contribution to the Extended Impact Assessment of INSPIRE.” INSPIRE Framework definition support (FDS) working group.