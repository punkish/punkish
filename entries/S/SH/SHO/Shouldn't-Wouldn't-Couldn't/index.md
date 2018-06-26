---
title      : Shouldn’t, Wouldn’t, Couldn’t
description:
modified   : 2016-04-11 17:21:00
created    : 2016-04-11 17:21:00
viewcount  : 0
id         : 661
gmap       :
tags        :
    - open licenses
    - Creative Commons
stars      :
---

I was recently asked by a respected friend and colleague if I would help his team develop a specific Creative Commons (CC) license for their project, a license that would limit the use of their content only to non-profits. This is actually not that unusual a question. I am no longer at CC, but even when I was working there, I remember on more than a few occasions such a question landed in front of me. Part of the motivation, I presume, stemmed from the high regard that people have for CC when it comes to copyright licenses, and for many people, CC is the *de facto* name for licenses. But, a part of the motivation is also because of a misunderstanding about how CC works. They tend to believe that CC would happily take an existing license, tweak it for a client’s specific needs, and create a new bespoke CC license. Nothing could be further from the truth.

While CC <strike>makes</strike> has made licenses, it is steadfastly against license-proliferation. When CC launched, it had eleven licenses that, over the years, were whittled down to the current six. When we were finishing up the couple of years long process that resulted in CC 4.0, our internal joke/hope was that we wouldn’t have to create another version for a decade. The bottomline is that too many licenses are confusing, and impede interoperability because of incompatibility.

Anyway, below is my response to the request, only slightly modified to not identify anyone specific. I have posted it here for posterity.

----

I probably could help you develop a license, but since I am not a lawyer, I **shouldn’t**. Based on my decade-long experience with CC and licenses, I probably **wouldn’t**. And, even if I ignored my own good counsel and did make a license, calling it a CC license, well, I **couldn’t**.

Now the long answer. If you want to skip over the long answer, make sure to read the <span class='pair' data-key='' data-val='What Would I Do'>WWID</span> section at the end.

## Shouldn’t

Licenses are easy to develop if you are not worried about either their longevity or their universal applicability. If you bring either of these considerations into play, licenses become very complicated. Like a chess game, one has to consider all the possible iterations in which things could go wrong. And, prepare for the ones that haven’t been considered. As my very wise friend and colleague, Iris Brest, once told me, a lawyer doesn’t guarantee us success but improves our odds of winning. The lawyer does so by considering all the edge cases, and even prepares contingency for cases that can’t yet be predicted. Which is why, if your project absolutely wants to develop a license, it should hire a lawyer, which I am not. This is why I shouldn’t.

## Wouldn’t

Licenses are ok for standalone, one-off things, but they complicate the situation when stuff licensed under one kind of license needs to be mixed with other stuff under a different license. If you want, you can read more about this in a paper I wrote titled [Policy Aware Geospatial Data](http://arxiv.org/abs/1304.5755). But the short of it is that a diversity of licenses is bad for interoperability of content. As is, we can’t seem to figure out [how many licenses is too many](http://punkish.org/How-Many-Licenses-is-Too-Many) resulting in a [babel of licenses](http://punkish.org/Babel-of-Licenses). One additional thing: the license has to have a legal basis. Since a license allows us to license our rights, we first have to have rights that we can license. And, in order to have those rights, we need to have some legal basis which gives us those rights. In the digital world, most of those rights stem from copyright, hence, *copyright licenses*. And, copyright imbues copyright licenses with special qualities that make the licenses viable. However, there is content that is not copyrightable. While we could make licenses for such content, we would have to ensure that we are licensing rights that we actually have. My friend [Mike Linksvayer](http://gondwanaland.com/mlog/), former CTO of CC, likes to say that [licenses make us stupid](http://book.costoffreedom.cc/book/opening:freedom/my-brain-on-freedom.html), and given that licenses suck our energy focusing our attention on the very thing that hinders us, I guess Mike is correct. The last thing the world needs is yet another license, and this is why I wouldn’t.

## Couldn’t

If I decided to ignore all the above caveats, and went ahead and created a license for your project, I could either create one from scratch, or I could take an existing CC license and repurpose it. No matter what I do, one thing I could not do is to call that license a CC license. That is because while the CC licenses themselves are in the public domain, via the [CC0 Public Domain Dedication](http://creativecommons.org/publicdomain/zero/1.0/), the actually CC name and mark are registered as a trademark precisely to prevent others form appropriating CC licenses, changing them and trying to pass them off as CC licenses. From CC [Terms of Use](https://creativecommons.org/terms/)

> CC-Owned Content: Other than the text of Creative Commons licenses, CC0, and other legal tools and the text of the deeds for all legal tools (all of which are made available under the CC0 Public Domain Dedication), Creative Commons trademarks (subject to the Trademark Policy), and the software code, all Content on the Websites is licensed under the Creative Commons Attribution 4.0 International license, unless otherwise marked. See the CC Policies page for more information.

This is why I couldn’t do that.

## What Would I Do

So, having told you that I shouldn’t, wouldn’t and couldn’t develop a “CC license” for your project, I also realize that I should offer something positive, something that I could do. I would examine all the contents of your project and determine the most appropriate, existing licenses for its various parts. Assuming there is nothing very strange about your project, hopefully some of the well-known open licenses would fit the bill. If there are any specific perceived needs (such as a specific content being used only by non-profits), I would try to understand why that need is desired. I would also point out the difficulties in determining whether or not a user is non-profit or not (the definition of a non-profit really varies from country to country). I would identify the parts of the your project’s content that need to be encumbered for any strategic reason (security, privacy, extraction of economic value, etc.), and make everything else as open as possible under an appropriate license. Then I would devote all my resources to ensuring that your project’s content is used by as many people as possible. After all, you wanted to make your content open in the first place, so that is exactly what I would help you do.

