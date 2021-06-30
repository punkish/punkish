---
title      : Version Controlled Journal
description: 
modified   : 2015-07-15 19:48:00
created    : 2015-05-15 19:48:00
viewcount  : 0
id         : 
gmap       : 
tags        :
    - code
    - project ideas
    - open science
    - publishing
stars      : 
---

## Proposal

**Journal:** A [Github](http://github.com)-like website with a version control backend, really, [git](http://www.git-scm.com), that provides a place to publish scholarly papers. 

**Publishing Mechanism:** The defining characteristic of this publishing mechanism, besides complete openness, would be version control which would be available at all levels. The system would be based on `git`. But, there would be a private area and a public area. So, if we follow [semantic versioning](http://semver.org) like x.y.z, all z level versions would be private, y and x level versions would be public, but only x level would be versions of record. The author would have complete control on when to move from z → y → x but to maintain integrity, one couldn’t go from x → y → z. That is, the version bump would only be one-way.

When the author starts writing her paper, she will keep it at —.—.z level until she is ready to make it public and put it up for “review.” In fact, she can even work elsewhere, in Google Docs or on her own computer locally using a word processor, until she is ready to put it up on the website. As soon as she posts the first version on the website, the paper gets a —.—.z version. z is your scratch space, or perhaps the space where you are co-writing it with your co-authors. You would have the ability to expose z to whoever you select, for a non-public, non-documented comment/review, if you choose.

Once she clicks a button and makes the paper available for “review,” the paper becomes —.y.z. After a bunch of comments, revisions, and finally, a judgment from a quorum, the paper moves to x.y.z and becomes a version of record.

All x.y.z papers automatically get a DOI and all that jazz that makes things appear official.

**Review:** Other registered members would review via comments, and the author could revise the paper on a continuous basis with revision numbers. This would be analogous to Google Docs, but more transparent regarding the changes made to the document. And, the official *version of record* would only be a major revision. The author would decide the version of record. The comments would be curated by the community, much like comments are curated right now on [Stack Overflow](http://stackoverflow.com), etc. The comments would have to  make sense, be respectful, etc., and it would be possible to comment on the comment itself. The commenters would earn (or lose) reputation points based on their activities, and thus, earn trust. The reputation/prestige would take time to build, and would be helped a lot if reputable academics participated.

There would be no anonymity. Every commenter, every participant, would have to verify identify. Doesn’t have to be an affiliation, but no one would be able to hide behind anonymity. if you’ve something to say, you should not feel the need to hide and say it.

**Subject Matter:** The journal platform itself would be subject-agnostic, much like PLOS One. However, papers would be assigned to predetermined set of subjects, and would also have labels (categories) that would lump them into virtual journals. So, one could click on the **paleontology** tag and see all the paleontology articles.

## Challenges

**Prestige:** Many academics will object because there is no prestige in such a system. people get a lot of credit (tenure and promotion) for publishing in Science/Nature etc. and almost none for publishing in the Bulletin of the Kansas Geological Survey. This is not necessarily a bad thing, but it does make it a lot more difficult for people to evaluate contributions. But the current system is far from perfect and can be misleading.

**Funding:** We need funding to build a website (the server and the software) plus organize the start of a curating committee. The initial funding to put it all together and launch and run it could be from a foundation or an institution. Most of the software already exists (server side, database, commenting systems, in browser markdown and LaTeX editors), in some form or another but would have to be customized and integrated with `git` on the backend.

## Further Potential

**Text and Data Mining:** The versions of record could be further analyzed and preprocessed for text and data mining, thereby offering their knowledge for further analysis via an API.
