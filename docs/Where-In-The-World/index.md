---
title      : Where In The World is Titty Ho?
description:
modified   : 2012-02-25 14:40:49
created    : 2012-02-25 14-40-49
viewcount  : 0
id         :
gmap       :
tags        :
    - code
    - earthbase
    - plugin
    - autofill
stars      :
---

<div id="foo" class="column grid_6" style="height: 350px;"></div>
<div id="lnglat" class="column grid_8" style="height: 20px; border-bottom: 1px dotted black; font-size: 0.8em; padding: 5px;"></div>

You are making a web application that requires users to enter location in **lng, lat**. Your users don't usually know the correct location, are guessing, or worse, are flipping **lng** and **lat**, so a location in Wisconsin ends up being in Antarctica.

It would be nice to have a little widget like on the left. Type a place name in the text box, or alternatively, first, pan and zoom to your general area of interest to narrow the search to that area, and locate your place of interest. Go ahead… type **Titty Ho** in the text box above and find out for yourself.

Well, here is help. Add the following line in your application where you want the widget to appear:

<pre class="brush: xml">
    <div id="map"></div>
</pre>

Put line 1 with the div wherever you want in your web page. You can position it using CSS. Note the *id* of the div. Now, add the following lines to the bottom of the page, just above the `</body>` tag

<pre class="brush: js">
	// Include the plugin
    &lt;script type="text/javascript" src="http://earth-base.org/lib/eb/autofill-0.2.0.min.js">&lt;/script>

    // Invoke the plugin
    &lt;script type="text/javascript">
    EB.autofill.init({

    	/*
    	 * id of the div where the widget appears
    	 *
    	 * This parameter is mandatory
    	 */
	    "div_id": "foo",

	    /*
	     * Supply a callback which will get your original "query" and
	     * the "result". The "result" is a JavaScript object with
	     * "lat" and "lng". The example function below updates a div
	     * on the page with these values. Replace this with your own
	     * function.
	     *
	     * This parameter is mandatory
	     */
	    "callback": function(query, result) {
	 	    $("#lnglat").html(
	 	    	query + " is at lng: " + parseFloat(result.lng).toFixed(2) +
	 	    	             ", lat: " + parseFloat(result.lat).toFixed(2));
	    },

	    /*
	     * Provide an optional width for the widget. The height of the
	     * is calculated automatically, and is a little more than the width.
	     * The width defaults to 200 if it is not provided, or is less than 200.
	     */
	    "width": 300,

	    /*
	     * An optional value for where the initial view of the map should be centered.
	     * Defaults to 0, 0 if not provided.
	     */
	    "center": {lng: -89, lat: 43},

		/*
		 * Optionally, make the widget without a map, in case you already have an
		 * application with a map
		 */
		"show_map": "no",

		/*
	     * Optional "zoom_to_on_callback" on callback. Defaults to 14 if not provided.
	     * Once a location is found, the callback can make the map zoom to this value.
	     */
	    "zoom_to_on_callback": 17,

		/*
		 * Optionally, provide a lng/lat bounding box to which the queries should be
		 * restricted. This is useful if the "no map" option is used
		 */
		"restrict_queries_to": {
			"min_lng": -146,
			"min_lat": 28,
			"max_lng": -52,
			"max_lat": 63
		},

	    /*
	     * Preferred default zoom level. Defaults to 7 if not provided but if center
	     * is provided. Defaults to 1 (whole world view) if center is not provided.
	     */
	    "zoom": 1,

	    // baselayer defaults to "terrain"
	    "baselayer": "terrain" | "roadmap"
    });
    &lt;/script>
</pre>

**NOTE:** The plugin is hard-coded to fire when 6 characters are typed in the search field. This works well mostly. You can still search for a place name shorter than 6 characters by typing a period '.'. For example, no query will be triggered for 'elgin', however, 'elgin**.**' will trigger a query.

**Acknowledgment:** This code utilizes a couple of excellent plugins modified for my use, namely the [autocomplete plugin from Devbridge](http://www.devbridge.com/projects/autocomplete/jquery/), and the [tipsy plugin from Jason Frame](http://onehackoranother.com/projects/jquery/tipsy/).

<script type="text/javascript">
/*
EB.autofill.init({
    "div_id": "foo",
	"callback": function(query, result) {
		$("#lnglat").html(query + " is at lng: " + parseFloat(result.lng).toFixed(2) + ", lat: " + parseFloat(result.lat).toFixed(2));
	},
	"include": {"gmaps": 1, "openlayers": 1, "jquery": 0},
    "width": 300,
    "show_map": "yes",
    "zoom_to_on_callback": 17,
    "center": {lng: 0, lat: 0},
    "zoom": 1,
    "baselayer": "roadmap"
});
*/
</script>


