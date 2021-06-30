<!doctype html>
    <!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
    <!--[if IE 7]>        <html class="no-js ie7 oldie" lang="en"> <![endif]-->
    <!--[if IE 8]>        <html class="no-js ie8 oldie" lang="en"> <![endif]-->
    <!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <title>CC Science: Sensors</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <link href="http://creativecommons.org/wp-content/themes/creativecommons.org/favicon.ico" title="Icon" type="image/x-icon" rel="icon" />
        <link rel="apple-touch-icon-precomposed" href="http://creativecommons.org/wp-content/themes/creativecommons.org/apple-touch-icon-114x114-precomposed.png" sizes="114x114" />
        <link rel="apple-touch-icon-precomposed" href="http://creativecommons.org/wp-content/themes/creativecommons.org/apple-touch-icon-72x72-precomposed.png" sizes="72x72" />
        <link rel="apple-touch-icon-precomposed" href="http://creativecommons.org/wp-content/themes/creativecommons.org/apple-touch-icon-precomposed.png">
        <!--
        <link rel="stylesheet" type="text/css" href="../css/default.css" />
        <link rel="stylesheet" type="text/css" href="../css/component.css" />
        -->
        <link rel="stylesheet" type="text/css" href="../css/science.css" />
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        <!-- <script src="../js/modernizr.custom.js"></script> -->
        <style>
            #map {
                position: absolute;
                top: 58px;
                right: 0;
                bottom: 30px;
                left: 0;
                width: auto;
                height: auto;
                z-index: -1;
                background-color: #fff;
            }
            footer {
                font-size: 0.7em; 
                height: 25px; 
                position: fixed; 
                bottom: 0px; 
                background-color: #f5f5f5;
                margin: auto;
                width: 100%;
                padding-top: 5px;
            }
        </style>
    </head>
    <body class="container" style="height: 100%;">
        <header>
            <div class="main archive">
                these pages (<a href="http://punkish.org/science/">/science/</a>) are a mirror of <a href="http://science.creativecommons.org/" target="_blank">http://science.creativecommons.org/</a>. While the original website is at the latter link, I have added more material to these pages below.
            </div>
            <div class="main">
                <h1><a href="/science/">CC Science</a> &rarr; <a href="/sensoredcity">Sensored City</a> &rarr; Sensors</h1>
                <nav>
                    <a href="http://creativecommons.org" target="_blank"><img src="../img/cc.large.png" width="30" height="30" alt="Creative Commons"></a>
                </nav>
            </div>
        </header>
        
        <div id="map"></div>
        
        <footer>
            <p class="main" xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#"><a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/"><img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" align="left"></a> To the extent possible under law, <a rel="dct:publisher" href="http://science.creativecommons.org"><span property="dct:title">Puneet Kishor</span></a> has waived all copyright and related or neighboring rights to <span property="dct:title">CC Science</span>. This work is published from: <span property="vcard:Country" datatype="dct:ISO3166" content="US" about="http://science.creativecommons.org">United States</span>.</p>
        </footer>
        
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        <script>
            // create a map in the "map" div, set the view to a given place and zoom
            var map = L.map('map').setView([38.2542376, -85.725], 14);
            
            // add an OpenStreetMap tile layer
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            var stations = [
                {
                    "id": 553,
                    "defaultLatitude": 38.25486, 
                    "defaultLongitude": -85.753594
                }, 
                    {
                    "id": 564,
                    "defaultLatitude": 38.248942, 
                    "defaultLongitude": -85.75788,
                }, 
                    {
                    "id": 565,
                    "defaultLatitude": 38.2566, 
                    "defaultLongitude": -85.756493
                }, 
                    {
                    "id": 566,
                    "defaultLatitude": 38.25306, 
                    "defaultLongitude": -85.757152
                }, 
                 {
                     "id": 567,
                     "defaultLatitude": 38.271078, 
                     "defaultLongitude": -85.789278
                 }, 
                    {
                    "id": 582,
                    "defaultLatitude": 38.253646, 
                    "defaultLongitude": -85.705165
                }
            ];
            
            for (var i=0, j=stations.length; i<j; i++) {
                // add a marker in the given location, attach some popup content to it and open the popup
                L.marker([stations[i].defaultLatitude, stations[i].defaultLongitude]).addTo(map);
                    // .bindPopup('A pretty CSS3 popup. <br> Easily customizable.');
            }
            
        </script>
        <!-- classie.js by @desandro: https://github.com/desandro/classie -->
        <!--
        <script src="../js/classie.js"></script>
        <script src="../js/cbpAnimatedHeader.min.js"></script>
        -->
    </body>
</html>