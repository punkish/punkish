---
title      : Perl Ref is an Array
description: 
modified   : 2006-03-04
created    : 
viewcount  : 30
id         : 328
gmap       : 
tags        :
    - code
    - Perl
stars      : 
ui			: 
---

<pre class="brush: Perl">
if (ref $var eq 'ARRAY') {
    print "It's an ARRAY ref\n";
}
elsif (ref $var eq 'HASH') {
    print "It's a HASH ref\n";
}
</pre>

