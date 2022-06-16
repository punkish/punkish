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

    > A = 'antonio'
    > B = 'benito'
    > A.split('')
    [ 'a', 'n', 't', 'o', 'n', 'i', 'o' ]
    > B.split('')
    [ 'b', 'e', 'n', 'i', 't', 'o' ]
    > AB = A.split('').concat(B.split(''))
    [ 'a', 'n', 't', 'o', 'n', 'i', 'o', 'b', 'e', 'n', 'i', 't', 'o' ]
    > uniqAB = A.split('')
        .concat(B.split('')
        .filter(x => A.split('').indexOf(x) < 0))
    [ 'a', 'n', 't', 'o', 'n', 'i', 'o', 'b', 'e' ]
    > intersectionAB = A.split('').filter(x => B.split('').includes(x))
    [ 'n', 't', 'o', 'n', 'i', 'o' ]
    > difference = A.split('').filter(x => !B.split('').includes(x))
    [ 'a' ]
    > symmetricDifferenceAB = A.split('')
        .filter(x => !B.split('').includes(x))
        .concat(B.split('').filter(x => !A.split('').includes(x)))
    [ 'a', 'b', 'e' ]