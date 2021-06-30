---
title      : SQLite
description: 
modified   : 2005-08-26
created    : 
viewcount  : 21
id         : 407
gmap       : 
tags        :
    - code
stars      : 
tmpl       : 2_cols
ui			: 
---

 install ReadLine (readline.h will likely go into /usr/local/include). Then edit the SQLite Makefile generated from <code>.configure</code> changing some lines:

 

<pre class="brush: Bash">
	# Compiler options needed for programs that use the readline() library.
	#
	READLINE_FLAGS = -DHAVE_READLINE=1 -I/usr/local/include/readline
	
	# The library that programs using readline() must link against.
	#
	LIBREADLINE = -lreadline
</pre>

