---
title      : Convex Hull
description: 
modified   : 2018-07-28 12:45:00
created    : 2018-07-28 12:45:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - language
    - Nada
    - code
stars      : 
---

<img src="stars.gif" style="border: 1px solid lightgrey;">

The possibility of art is that how and what it is interpreted as by the viewer may have absolutely no connection to what its creator intended. For the most part, we, the viewer, don’t even know the creator. While we may glean a bit about the origin story of the artwork, for the most part, we have no idea what the artist was thinking before and during the process of its creation. The artist created the work and moved on, or maybe not. But it doesn’t matter… for, as the work’s viewer, we can keep on going back to it, and discovering new insights in its, new subtleties that matter only to us. And thereby come into existence the subsequent lives of art, on each interpretation by each individual viewer.

Not just the language of language but the language of art, of music, of anything, is infinitely mutable. Starting with only a couple of dozen (or a bit more) letters, we can construct zillions of words that can be strung together to convey gajillions of thoughts. I’d like to think of a `convex hull` as the tighest enclosure of all the ideas contained in a work. And, while it has a boundary, much like the [circle whose center is everywhere](/Circle-whose-center-is-everywhere), it is imperfect, inadquate. And therein lies its beauty, for with each, even the slightest of rearrangement, a new interpretation is possible. Such is the possibility of art. [What the artist does says about her. What I see in her work says about me.](/What-You-Do-Says-About-You)

Using [Andrey Naumenko’s high performance JavaScript 2D Convex Hull program](https://github.com/indy256/convexhull-js) 

    function convexHull(points) {

        function removeMiddle(a, b, c) {
            var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
            var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
            return cross < 0 || cross == 0 && dot <= 0;
        }

        points.sort(function (a, b) {
            return a.x != b.x ? a.x - b.x : a.y - b.y;
        });

        var n = points.length;
        var hull = [];

        for (var i = 0; i < 2 * n; i++) {
            var j = i < n ? i : 2 * n - 1 - i;
            while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
                hull.pop();
            hull.push(points[j]);
        }

        hull.pop();
        return hull;
    }