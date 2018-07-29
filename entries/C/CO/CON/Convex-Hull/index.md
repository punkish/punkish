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

<figure>
    <img src="stars.gif" style="border: 1px solid lightgrey;">
    <figcaption>convex hull</figcaption>
</figure>

The possibilities afforded by art depend upon how and what is interpreted by the viewer, and may have absolutely no connection to what its creator intended. Most of the times, we don’t even know the creator. While we may glean a bit about the origin of the artwork, for the most part, we have no idea what the artist was thinking before and during the process of its creation. The artist created the work and moved on, or not. But it doesn’t matter… for, as the work’s viewer, we can keep on going back to it, and as long as we are curious about it, we can keep on discovering new insights in it, new subtleties that matter only to us. And thereby come into existence the subsequent lives of that work, on each interpretation by each individual viewer.

Two strangers meet. They’ve had different trajectories but have arrived at the same point. And yet, they are connected by history, and by the baggage of language. They talk in a language that a third person can understand. Their words have weight, and that weight gives them form. The form shifts and changes shape, but is palpable. The language of language is infinitely mutable. Starting with only a couple of dozen (or a few more) letters, we can construct zillions of words that can be strung together to convey gajillions of thoughts. A `convex hull` is the tighest enclosure for all the ideas contained in a work. And, while it has a boundary, much like the [circle whose center is everywhere](/Circle-whose-center-is-everywhere), it is an inadquate container of ideas. And therein lies its beauty, for with each, even the slightest of rearrangement, a new interpretation is possible. Such is the possibility of art. [What the artist does says about her. What I see in her work says about me.](/What-You-Do-Says-About-You)

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

All we need is a set of words, points in space and time, and the curiosity afforded by `convexHull(points)` to explore the world of ideas.

[^1]: The animated convex hull based on an image from the [Evacuation of Nada](http://irahadzic.com/evacuation-of-nada) by Ira Hadžić.