---
title      : Dictionary in a Webpage
description: 
modified   : 2015-07-03 10:14:00
created    : 2015-07-03 10:14:00
viewcount  : 0
id         : 717
gmap       : 
tags        :
    - code
    - programming
stars      : 
---

I wanted to <span class='pair' data-key='' data-val='bring something into existence'>create</span> in a webpage with text that had its meaning or translation <span class='pair' data-key='' data-val='fixed firmly and deeply into the surrounding mass'>embedded</span> within, and a means to display them. Click on any of the underlined terms for a demo.

For each `pair` of `key` and its `value`, create markup as shown below

	<span class='pair' 
		  data-key='' 
		  data-val='bring something into existence'>create</span>
	
Add the following JavaScript for implementing the action

	var translateThis = function() {
		if (this.dataset.key === '') {
			this.dataset.key = this.innerHTML;
			this.innerHTML = this.dataset.val;
		}
		else {
			var tmp = this.dataset.key;
			this.dataset.key = this.innerHTML;
			this.innerHTML = tmp;
		}
	}
	
	window.onload = function() {
		var pairs = document.getElementsByClassName('pair');
		for (var i=0, j=pairs.length; i<j; i++) {
			pairs[i].onclick = translateThis;
		}
	}
	
Optionally, style the term pairs

	.pair {
		border-bottom: 1px dotted;
		cursor: pointer;
	}
	
et voilà !
