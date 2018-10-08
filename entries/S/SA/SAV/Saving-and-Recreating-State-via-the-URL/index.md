---
title      : Saving and Recreating State via the URL
description: 
modified   : 2018-10-01 10:26:00
created    : 2018-10-01 10:26:00
viewcount  : 0
id         : 709
gmap       : 
tags       :
    - code
    - web design
stars      : 
---

<style>
th { cursor: pointer; }
</style>

Imagine the following scenario: The user goes to `https://punkish.org/Saving-and-Recreating-State-via-the-URL`, enters a term in a search field and hits the **go** button. (Go ahead, enter some text in the field below and hit the button.)

<input id='s' type="search" placeholder="enter something"> <button id="go">go</button>

<div id='search-result' style='visibility: hidden;'>The results are displayed and the URL is now <code>https://punkish.org/Saving-and-Recreating-State-via-the-URL?q=<span class="search-term"></span></code>. Note that the search field shows that a search was performed for "<span class="search-term"></span>". The user then clicks on the <a href="#table">table</a> link (which is an anchor on the page). This causes the page to scroll down to the section with the table.</div>

<table id="table">
    <tr><td colspan="3">The URL is now <code>https://punkish.org/Saving-and-Recreating-State-via-the-URL?q=<span class="search-term"></span>#table</code>.</td></tr>
    <tr>
        <th id="1">one</th>
        <th id="2">two</th>
        <th id="3">three</th>
    </tr>
</table>

<p>The user clicks on a table cell firing an event that highlights that cell in red. The URL is now <code>https://punkish.org/Saving-and-Recreating-State-via-the-URL?q=<span class="search-term"></span>#table!highlightCell:id?</code> where <code>id</code> is the <b>id</b> of the highlighted cell.</p>

Then the user bookmarks the URL or sends it to a friend. When its recipient opens that URL (or when the user clicks on the bookmark at some point in time later), the state is restored exactly as what it was for the sender. In other words, the URL is parsed and the actions performed to restore the state… 

1. the query is performed for "bar" and the results are shown, with the search field indicating the search term.
2. the page scrolls down to the **table** section, and
3. the `highlightCell(id?)` event is fired highlighting the specified cell in the table.

This way the state of a page is encoded in the URL which can be shared and then recreated by the recipient of the URL bookmark.

So, I have three sets of params that I want to clearly identify:

<dl>
    <dt>The queryString <code>?q=<span class="search-term"></span></code> that is processed on the server</dt>
    <dd>The queryString is encoded as expected, a key:value pair separated by '='</dd>

    <dt>The event <code>highlightCell:id?</code> that is processed in the client, and</dt>
    <dd>The event is encoded as a key:value pair separated by ':' where the key is the function and the value is the parameter. In case of no parameter, the value is left blank (<code>fn:</code>. Since events have to fire in a particular order, they are provided as an ordered list of key:value pairs (<code>fn1:param1,param2;fn2:,fn3:param1,…</code>)</dd>

    <dt>The hash fragment <code>#table</code> which specifies an anchor on the page.</dt>
    <dd>The hash fragment encoded as expected, with a leading '#'</dd>
</dl>


<script>
document.getElementById('go').addEventListener('click', function(event) {
    const st = document.getElementById('s').value;

    document.querySelectorAll('.search-term').forEach(el => { el.innerHTML = st });
    document.querySelector('#search-result').style.visibility = 'visible';

    history.pushState(
        {urlPath: `https://punkish.org/Saving-and-Recreating-State-via-the-URL?q=${st}`},
        '',
        `/Saving-and-Recreating-State-via-the-URL?q=${st}`
    );

    event.preventDefault();
    event.stopPropagation();
});

const fn = {
    highlightCell: function(id) {
        document.querySelector(`th[id="${id}"]`).style.backgroundColor = 'red';
    }
};

const parseUrl = function(href) {
    // var parser = document.createElement('a');
    // parser.href = "http://example.com:3000/pathname/?search=test#hash";

    href.protocol; // => "http:"
    href.host;     // => "example.com:3000"
    href.hostname; // => "example.com"
    href.port;     // => "3000"
    href.pathname; // => "/pathname/"
    href.hash;     // => "#hash"
    href.search;   // => "?search=test"
    href.origin;   // => "http://example.com:3000"

    return href;
}

const shim = function(event) {
    const id = this.id;
    fn.highlightCell(id);
    window.location.hash += `!highlightCell:${id}`;
};

const th = document.querySelectorAll('th');
th.forEach(el => {
    el.addEventListener('click', shim)
});

if (window.location.search) {
    const q = window.location.search.substr(1).split('=');
    document.getElementById('s').value = q[1];
}

if (window.location.hash) {
    const h = window.location.hash.substr(1).split('!');
    if (h[1]) {
        ha = h[1].split(':');
        fn[ha[0]](ha[1]);
    }
    window.location.hash = h[0];
    window.location.hash = h.join('!');

    if (window.location.search) {
        const st = document.getElementById('s').value;

        document.querySelectorAll('.search-term').forEach(el => { el.innerHTML = st });
        document.querySelector('#search-result').style.visibility = 'visible';
    }
}
</script>