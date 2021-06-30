---
title      : ReadLine
description: 
modified   : 2006-03-08
created    : 
viewcount  : 32
id         : 350
gmap       : 
tags        :
    - 
stars      : 
---

Readline requires some special configuration in order for it to build properly under darwin|macosx configurations.
<pre class="brush: Bash">
% cd ~/build/
% curl -O ftp://ftp.cwru.edu/pub/bash/readline-4.3.tgz;
% gnutar xzf readline.*.tar.gz
% pushd readline-4.3/
Edit support/shobj-conf:
Inside the darwin*|macosx* configuration...
Replace:  SHLIB_LIBS='-lSystem'
With:     SHLIB_LIBS='-lSystem -lcurses -lgcc'
% ./configure --prefix=$LOCAL
% make
% sudo make install
% popd
</pre>

*Update:* Readline version 5 and above build cleanly on the Mac.

