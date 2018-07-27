---
title      : Set Operations in JavaScript
description: 
modified   : 2018-07-24 19:17:00
created    : 2018-07-24 19:17:00
viewcount  : 0
id         : 232
gmap       : 
tags       :
    - code
stars      : 
---

Using only vanilla JavaScript

    > a = 'antonio'.split('')
    [ 'a', 'n', 't', 'o', 'n', 'i', 'o' ]
    > b = 'alberto'.split('')
    [ 'a', 'l', 'b', 'e', 'r', 't', 'o' ]
    > union = a.concat(b)
    [ 'a', 'n', 't', 'o', 'n', 'i', 'o', 'a', 'l', 'b', 'e', 'r', 't', 'o' ]
    > uniqUnion = a.concat(b.filter(x => { return a.indexOf(x) < 0 }))
    [ 'a', 'n', 't', 'o', 'n', 'i', 'o', 'l', 'b', 'e', 'r' ]
    > intersection = a.filter(x => b.includes(x))
    [ 'a', 't', 'o', 'o' ]
    > difference = a.filter(x => !b.includes(x))
    [ 'n', 'n', 'i' ]
    > symmetricDifference = a.filter(x => !b.includes(x)).concat(b.filter(x => !a.includes(x)))
    [ 'n', 'n', 'i', 'l', 'b', 'e', 'r' ]