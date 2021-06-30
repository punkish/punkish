---
title      : Designing URIs
description: 
modified   : 2011-10-09 19:35:00
created    : 2011-10-09 19:35:00
viewcount  : 0
id         : 
gmap       : 
tags        :
    - semantic web
    - URIs
    - REST
stars      : 
tmpl       : 1_cols
ui		   :
---

A uniform resource identifier (URIs) identifies a resource on the web, and, as such, is the primary way to reach it. While URIs are used in web sites, human users with web browsers are not the only clients of URIs. The URIs are also used by web crawlers as they go about indexing the web, are used by users to email and share information with others, and can also be used in programs as a primary means of getting direct access to data.

*   URIs should be permanent, because [Cool URIs don't change][w3a]. Any changes should be handled by letting the server provide [HTTP/1.1 Status Code Definitions][w3b] such as 301 (permanent redirect) or 307 (temporary redirect).

[w3a]: http://www.w3.org/Provider/Style/URI.html "Cool URIs don't change"  
[w3b]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html "HTTP/1.1 Status Code Definitions"  

*   all URIs should point to nouns.

    <pre name='code' class='brush: xml'>
    &lt;a href="http://example.com/employees"&gt;Employees&lt;/a&gt;
    </pre>
    
*   URIs may have query parameters to identify specific items.

    <pre name='code' class='brush: xml'>
    &lt;a href="http://example.com/employees?id=3"&gt;Employee id 3&lt;/a&gt;  
    &lt;a href="http://example.com/employees?gender=male&status=active"&gt;Active male employees&lt;/a&gt;  
    </pre>

*   all links should have both hrefs and JavaScript triggers allowing them to work with or without JavaScript. First, in the html page, we have --

    <pre name='code' class='brush: xml'>
    &lt;a href="http://example.com/employees?id=3"&gt;Employee id 3&lt;/a&gt;
    </pre>

    And then, in JavaScript, we have --

    <pre name='code' class='brush: jscript'>
    &lt;script type="text/javascript"&gt;
    var APP = {
    "ajaxGet" : function(loc, dir) {
        $.ajax({
            url     : loc,
            type    : "GET",
            data    : "",
            dataType: "json",
            error   : function() { alert("Error loading html document"); },
            success : function(res) {
                // Update appropriate web page portions
                APP.updatePage(res);
                // Update analytics to track usage
                APP.updateAnalytics(loc);
                /*
                Push loc in history stack to enable browser back button, 
                but do it only if the dir (direction) is not "back" 
                otherwise history will get filled with "previous" location 
                thereby setting a never-ending loop.
                */
                if (dir !== "back") {
                    history.pushState(null, null, loc);
                }
            }
        });
    },
    "updatePage" : function() {
    },
    "updateAnalytics" : function() {
    };
    
    $(document).ready(function() {
        /*
        Enable each link to fire the ajaxGet() function
        on being clicked. Send an empty string for "dir".
        */
        $("a").click(function() {
            APP.ajaxGet($(this).attr("href"), "");
            /*
            returning false ensures that the href 
            in the anchor is not fired, and instead, 
            ajaxGet() is used
            */
            return false;
        });
        /*
        The following bit of code enables the browser back button.
        When the user clicks the back button, the location from 
        the history stack is fed to ajaxGet() to restore the previous 
        web page.
        */
        window.setTimeout(function() {
            window.addEventListener(
                "popstate", 
                function(e) {
                    APP.ajaxGet(location.href, "back");
                }, 
                false
            );
        }, 1);
    });
    &lt;/script&gt;
    </pre>

    The above code works even if JavaScript is completely turned off. If JavaScript is active, the `ajaxGet()` call is triggered instead of a full browser refresh. The results of the query are received as a JSON structure. The results are used to update the appropriate portion of the web page dynamically. Additionally, site analytics are updated. Most importantly, the requested page is inserted into the browser history stack. This ensures that if the user presses the browser back button, the correct "previous" page is displayed. Finally, web crawlers are able to correctly navigate the web site by using the href property, and don't have to depend upon temporary technology hacks to view the content that would otherwise be accessible only via ajax.
  
*   On the server side there should be an accommodation made for dealing with both ajax and non-ajax requests. This would allow users to not only view the web site directly with all the dynamic feel and speed that ajax affords, but they would also be able to bookmark or email fully-formed links to others who would then be able to visit the requested page directly.
  
*   Programmatic access to the data would be via commandline use of any www commandline program or library such as `curl`, `wget` or `LWP`

    <pre name='code' class='brush: bash'>
    $ curl -O http://example.com/employees?gender=male&status=active
    </pre>

*   The server application would offer data in different formats. While the default data format would be JSON, appropriate data would be returned based on simply a logical extension to the URI.  

    JSON
    <pre name='code' class='brush: bash'>
    $ curl -O http://example.com/employees?gender=male&status=active
    $ curl -O http://example.com/employees.json?gender=male&status=active
    </pre>
    
    XML
    <pre name='code' class='brush: bash'>
    $ curl -O http://example.com/employees.xml?gender=male&status=active
    </pre>
    
    YAML
    <pre name='code' class='brush: bash'>
    $ curl -O http://example.com/employees.yml?gender=male&status=active
    </pre>
    
    tar gzipped
    <pre name='code' class='brush: bash'>
    $ curl -O http://example.com/employees.tgz?gender=male&status=active
    </pre>


