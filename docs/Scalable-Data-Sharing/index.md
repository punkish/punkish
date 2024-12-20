---
title      : Scalable Data Sharing in GeoSciences
description: lessons from MacroStrat
modified   : 2017-06-14 16:15:00
created    : 2017-06-14 16:15:00
viewcount  : 0
id         : 232
gmap       : 
where      : Department of GeoScience, University of Göttingen
when       : June 2017
tags       :
    - presentation
    - Göttingen
    - Germany
    - The World Bank
    - Washington DC
stars      : 
---

background-image: url('img/macrostrat-cover-sm.jpg')
background-size: cover
class: center, middle

# Macrostrat

---

## Macrostrat
### Database for geological data.

[Macrostrat](https://macrostrat.org) is a platform for the aggregation and distribution of geological data relevant to the spatial and temporal distribution of sedimentary, igneous, and metamorphic rocks as well as data extracted from them. It aims to become a community resource for the addition, editing, and distribution of new stratigraphic, lithological, environmental, and economic data. Interactive applications built upon Macrostrat are designed for educational and research purposes.

--

A comprehensive relational database currently  containing 1,474 regional rock columns, 33,903 stratigraphic units, 2,050,565 geologic map polygons, and more than 90,000 attributes (radioisotopic ages, lithologies, economic uses, etc.).

--

Macrostrat was originally built to test hypotheses for the correlation between the sedimentary rock and fossil records. It is spatially explicit and chronostratigraphically focused and serves as a scaffolding for organizing and analyzing geological data of all types.

---

## Source of Data

Data are aggregated from multiple published and online sources, including those from the Geological Survey of Canada, the United States Geological Survey, and the AAPG.

---

## Data are CC BY 4.0

<img src="img/cc-by-4.jpg" width="100%">

---

## Software

http://strata.geology.wisc.edu/software.html  
https://github.com/UW-Macrostrat  
http://strata.geology.wisc.edu/news.html

---

## Macrostrat Apps

<img src="img/burwell_logo.png" width="150" height="150">

### [Burwell](https://macrostrat.org/map) Geological bedrock maps linked to geodeepdive and elevation profiles

--

<img src="img/sift_logo.png" width="150" height="150">

### [Sift](https://macrostrat.org/sift): Macrostrat columns, with to bedrock maps and PBDB fossils

---

## Burwell

### [What is at a point lat 51.5115, lng 10.2242?](https://macrostrat.org/burwell/#11/51.5115/10.2242)

<img src="img/burwell-point.jpg" width="80%">

---

## Burwell

### [elevation profile between two points lat 51.5113, lng 10.1256](https://macrostrat.org/burwell/#11/51.5113/10.1256)

<img src="img/burwell-elevation.jpg" width="80%">


<!-- https://macrostrat.org/api/v2/elevation?start_lng=10.05867&start_lat=51.48395&end_lng=10.24063&end_lat=51.56896 -->

---

## Sift

Search for [John Day - Suplee, Central Oregon](https://macrostrat.org/sift/#/column/290). Learn more about that column. 

<img src="img/sift-john-day.jpg" width="80%">

<!-- https://macrostrat.org/api/v2/columns?col_id=290 -->

---

## Sift

Check out one of its units, say [Unit 7511 - Keller Creek Shale](https://macrostrat.org/sift/#/unit/7511)

<img src="img/sift-keller-unit.jpg" width="80%">

<!-- https://macrostrat.org/api/v2/units?unit_id=7511 -->

---

## Sift

Can I search between certain ages? Yes, by using time [intervals which define ages](https://macrostrat.org/sift/#/interval/981)

<img src="img/sift-interval.jpg" width="80%">

---

## Sift

[Lithology](https://macrostrat.org/sift/#/lithology/107)

<img src="img/sift-lithology.jpg" width="80%">

<!-- https://macrostrat.org/api/columns?age_top=500&age_bottom=510&format=geojson_bare -->

---

class: center, middle

# API

---

## Burwell

<a href="https://macrostrat.org/api/v2/geologic_units/burwell?lat=51.5404&lng=10.1740" onclick="">What is at a point lat 51.5115, lng 10.2242?</a>

<pre><code id="burwell-location" class="json">
{"success":{
    "v":2,"license":"CC-BY 4.0",
    "data":[
        {"map_id":1382032,"source_id":18,"name":"Triassic sedimentary rocks","strat_name":"","lith":"sedimentary rocks","descrip":"","comments":"","macro_units":[],"strat_names":[],"liths":[],"t_int_id":63,"t_int_age":201.3,"t_int_name":"Triassic","b_int_id":63,"b_int_age":252.17,"b_int_name":"Triassic","color":"#812B92","t_age":201.3,"b_age":252.17,"best_int_name":"Triassic"},
        {"map_id":2603155,"source_id":94,"name":"","strat_name":"","lith":"Silt; fine-sandy, clayey, in parts increasingly calcareous downwards","descrip":"loess (aeolian) loess loam","comments":"Loess, loess loam and other loess derivatives, often above older loesses","macro_units":[],"strat_names":[],"liths":[4],"t_int_id":4,"t_int_age":0.0117,"t_int_name":"Pleistocene","b_int_id":4,"b_int_age":2.588,"b_int_name":"Pleistocene","color":"#FFF2AE","t_age":0.0117,"b_age":2.588,"best_int_name":"Pleistocene"}
    ],
    "refs":{
        "18":"Geological Survey of Canada. Generalized geological map of the world and linked databases. doi:10.4095/195142. Open File 2915d. ","94":"Toloczyki, M., P. Trurnit, A. Voges, H. Wittekindt, A. Zitzmann. Geological Map of Germany 1:M. Bundesanstalt für Geowissenschaften und Rohstoffe. "
    }}
}
</code></pre>

---

## Burwell

### elevation profile between two points lat 51.5113, lng 10.1256 [https://macrostrat.org/api/v2/elevation?start_lng=10.05867&start_lat=51.48395&end_lng=10.24063&end_lat=51.56896]()

<pre><code id="burwell-elevation" class="json">
{"success":{
    "v":2,"license":"CC-BY 4.0",
    "data":[
        {"lng":10.05867,"lat":51.48395,"d":0,"elevation":227},
        {"lng":10.0595798,"lat":51.48437505,"d":0.08,"elevation":219},
        {"lng":10.0604896,"lat":51.4848001,"d":0.16,"elevation":207},
        {"lng":10.0613994,"lat":51.48522515,"d":0.24,"elevation":222},
        {"lng":10.0623092,"lat":51.4856502,"d":0.32,"elevation":238},
        {"lng":10.063219,"lat":51.48607525,"d":0.39,"elevation":237},
        {"lng":10.0641288,"lat":51.4865003,"d":0.47,"elevation":237},
        {"lng":10.0650386,"lat":51.48692535,"d":0.55,"elevation":236},{"lng":10.0659484,"lat":51.4873504,"d":0.63,"elevation":226},{"lng":10.0668582,"lat":51.48777545,"d":0.71,"elevation":220},
        …
    ]
}}
</code></pre>

---

## Columns of a certain type?

### Organic https://macrostrat.org/api/columns?lith_type=organic

<pre><code id="macrostrat-columns-organic" class="json">
{"success":{
    "v":2,"license":"CC-BY 4.0",
    "data":[
        {"col_id":1169,"col_name":"Cuba S.E. (Baracoa Purial)","col_group":"Caribbean Islands","col_group_id":27,"group_col_id":"7.00","col_area":"33768.3","project_id":7,"refs":[6]},
        {"col_id":502,"col_name":"Western Uinta Basin","col_group":"CSR","col_group_id":3,"group_col_id":"16.00","col_area":"20528.3","project_id":1,"refs":[1]},
        …
    ],
    "refs":{
        "1":"Childs, O.E. Correlation of stratigraphic units of North America; COSUNA. AAPG Bulletin 69:173-180. 1985. ",
        "2":"Douglas, R.J.W. Geology and economic minerals of Canada. Geological Survey of Canada Economic Geology Report No. 1. 1970. ",
        "3":"Dockery, D.T. Stratigraphic Units of Mississippi. Mississippi Department of Environmental Quality. 2008. http://deq.state.ms.us/MDEQ.nsf/page/Geology_surface. ",
        …
    }
}}
</code></pre>

---

## Columns of a certain type?

### Water https://macrostrat.org/api/v2/columns?econ_type=aquifer

<pre><code id="macrostrat-columns-aquifer" class="json">
{"success":{
    "v":2,"license":"CC-BY 4.0",
    "data":[
        {"col_id":533,"col_name":"Covington County Alabama","col_group":"GC","col_group_id":5,"group_col_id":"18.00","col_area":"13758.6","project_id":1,"refs":[1]},
        {"col_id":534,"col_name":"Barbour County Alabama","col_group":"GC","col_group_id":5,"group_col_id":"19.00","col_area":"10981.3","project_id":1,"refs":[1]},
        …
    ],  
    "refs":{
        "1":"Childs, O.E. Correlation of stratigraphic units of North America; COSUNA. AAPG Bulletin 69:173-180. 1985. ",
        "3":"Dockery, D.T. Stratigraphic Units of Mississippi. Mississippi Department of Environmental Quality. 2008. http://deq.state.ms.us/MDEQ.nsf/page/Geology_surface. "
    }
}}
</code></pre>

---

## Columns of a certain type?

### Silver https://macrostrat.org/api/v2/columns?econ_id=15

<pre><code id="macrostrat-columns-silver" class="json">
{"success":{
    "v":2,"license":"CC-BY 4.0",
    "data":[
        {"col_id":461,"col_name":"Mountain City, Nevada to Twin Falls, Idaho","col_group":"GB","col_group_id":4,"group_col_id":"7.00","col_area":"26235.4","project_id":1,"refs":[1]},
        {"col_id":478,"col_name":"East Tintic Mountains, Utah","col_group":"GB","col_group_id":4,"group_col_id":"24.00","col_area":"6611.6","project_id":1,"refs":[1]},
        …    
    ],
    "refs":{
        "1":"Childs, O.E. Correlation of stratigraphic units of North America; COSUNA. AAPG Bulletin 69:173-180. 1985. ",
        "3":"Dockery, D.T. Stratigraphic Units of Mississippi. Mississippi Department of Environmental Quality. 2008. http://deq.state.ms.us/MDEQ.nsf/page/Geology_surface. "
    }
}}
</code></pre>

---

## Definitions 

https://macrostrat.org/api/v2/defs/

<pre><code id="macrostrat-definitions" class="json">
{
  "success": {
    "v": 2,
    "description": "Routes giving access to standard fields and dictionaries used in Macrostrat",
    "routes": {
      "/defs/autocomplete": "Quickly retrieve all definitions matching a query. Limited to 100 results.",
      "/defs/define": "Define multiple terms simultaneously",
      "/defs/languages": "Returns ISO 639-3 and ISO 639-1 codes for all languages",
      "/defs/lithologies": "Returns all lithology definitions",
      "/defs/lithology_attributes": "Returns lithology attribute definitions",
      "/defs/structures": "Returns all structure definitions",
      "/defs/columns": "Returns column definitions",
      "/defs/econs": "Returns econ definitions",
      "/defs/environments": "Returns environment definitions",
      "/defs/intervals": "Returns all time interval definitions",
      "/defs/sources": "Returns sources associated with geologic units. If a geographic format is requested, the bounding box of the source is returned as the geometry.",
      "/defs/strat_names": "Returns strat names",
      "/defs/strat_name_concepts": "Returns strat name concepts",
      "/defs/timescales": "Returns timescales used by Macrostrat",
      "/defs/minerals": "Returns mineral names and formulas",
      "/defs/projects": "Returns available Macrostrat projects",
      "/defs/plates": "Returns definitions of plates from /paleogeography",
      "/defs/measurements": "Returns all measurements definitions",
      "/defs/groups": "Returns all column groups",
      "/defs/refs": "Returns references"
    }
  }
}
</code></pre>

---

## Fun with coal

<img src="img/coal-greenland.jpg" width="80%">

<cite class="footnote">National Museum of Denmark. Greenland in the late 19th-early 20th century. The coal mine at Qaarsuarsuk. Photo: Th. N. Krabbe 1889-1909. <a href="https://www.flickr.com/photos/thenationalmuseumofdenmark/11288976563/in/photolist-icyXqX-pfY7Xk-oskiQf-owhfWC-nj4pUC-8S6ADA-nQGpip-6Xcoeg-R6gA7Q-ouaAiw-RyVeXj-cqqWZ1-pDSDFE-o85x6d-pV9TAW-oy8DLc-6K8BG7-4jCzJj-8ZNzeF-7v1Uqu-nFfJGF-owjWNa-o6b3RV-6XcEg2-a4JwZt-8S6JcS-bLoKCZ-oweZbf-ocBppo-ouyCyq-oueQM4-cQA4gL-6gBqre-6K8A9b-dtoNrm-odfCif-r5yraZ-bxtZzA-nZvDfX-n1aXE6-4jyYrq-cqqqV3-qASj4z-otDLV1-cXCnLJ-owpbtL-r7x31V-7uWZkB-8QT2dC-sQkoqS" target="_blank">more</a>. No known copyright restrictions.</cite>.

---

## Fun with coal

https://macrostrat.org/api/columns?lith_type=organic  
https://macrostrat.org/sift/#/economic/13  
https://macrostrat.org/sift/#/lithology/38

### Let’s find out units of coal through time

---

class: center, middle

# nodejs

---

## nodejs and request

```js
const request = require('request');

const q = function (error, response, body) {
    if (error) {
        console.log('error: ' + error);
    }

    if (response && response.statusCode == 200) {
        const result = JSON.parse(body).success;
        const data = result.data;
        let col_area = 0;
        data.forEach(function(el) {
            col_area += el.col_area * 1;
        });
        console.log("column area: " + col_area);
        console.log(result);
    }
};

request('https://macrostrat.org/api/v2/columns?age=271', q);
```
---

## nodejs and request

```js
'use strict';

const Histogram = require('histogramjs');
const Request = require('request');
const Http = require('http');

const root = 'https://macrostrat.org/api/v2/';

const calcUnits = function() {

    let timeScale = null;
    let timeBins = null;
    let units = null;
    let lith_names = null;
    let min = null;
    let max = null;
    let interval = 20;

    const ql = function(error, response, body) {
        if (error) {
            console.log('error: ' + error);
        }

        if (response && response.statusCode == 200) {
            const liths = JSON.parse(body).success.data;
            lith_names = [];
            liths.forEach(function(el) {
                lith_names.push(el.name)
            });

            console.log("done with liths, now on to time");
            // [ 'coal', 'peat', 'lignite', 'anthracite', 'tar', 'gyttja' ]

            // The following call fills up 'timeScale'
            Request(root + 'defs/intervals?timescale=international ages', qt);
        }
    };

    const qt = function(error, response, body) {
        if (error) {
            console.log('error: ' + error);
        }

        if (response && response.statusCode == 200) {
            timeScale = JSON.parse(body).success.data;
            /*
            [ { int_id: 3,
             name: 'Holocene',
             abbrev: null,
             t_age: 0,
             b_age: 0.0117,
             int_type: 'epoch',
             timescales: [Object],
             color: '#FEF2E0' },
            ]
            */

            let t_ages = [];
            let b_ages = [];
            for (let i = 0, j = timeScale.length; i < j; i++) {
                t_ages.push(timeScale[i].t_age);
                b_ages.push(timeScale[i].b_age);
                timeScale[i]['units'] = 0;
            }
  
            t_ages.sort(function(a, b) {
                return a - b;
            });
            min = t_ages[0];
            
            b_ages.sort(function(a, b) {
                return a - b;
            }).reverse();
            max = b_ages[0]

            console.log("done with time, now on to units");

            // now we query the units
            Request(root + 'units?project_id=1,7&environ_class=non-marine&response=long', qu);
        }
    };
    
    const qu = function(error, response, body) {
        if (error) {
            console.log('error: ' + error);
        }

        if (response && response.statusCode == 200) {
            units = JSON.parse(body).success.data;
            /*
            [ { unit_id: 758,
                section_id: 106,
                col_id: 22,
                project_id: 1,
                col_area: 26763.09,
                unit_name: 'Unnamed',
                strat_name_id: null,
                Mbr: '',
                Fm: '',
                Gp: '',
                SGp: '',
                t_age: 0,
                b_age: 0.0117,
                max_thick: 18,
                min_thick: 0,
                outcrop: 'surface',
                pbdb_collections: 0,
                pbdb_occurrences: 0,
                lith: [ [Object], [Object], [Object] ],
                environ: [ [Object] ],
                econ: [],
                measure: [],
                notes: 'Alluvium',
                color: '#FCF768',
                text_color: '#000000',
                t_int_id: 3,
                t_int_name: 'Holocene',
                t_int_age: 0,
                t_prop: 1,
                units_above: [ 0 ],
                b_int_id: 3,
                b_int_name: 'Holocene',
                b_int_age: 0.0117,
                b_prop: 0,
                units_below: [ 759 ],
                strat_name_long: null,
                refs: [ 1 ],
                clat: 36.583,
                clng: -96.434,
                t_plat: 36.583,
                t_plng: -96.434,
                b_plat: 36.586,
                b_plng: -96.429,
                coal: false },
                …
            ]
            */

            let i = 0;
            let j = units.length;

            for (; i < j; i++) {
                let unit = units[i];
                let k = 0;
                let l = unit.lith.length;

                for (; k < l; k++) {
                    let unit_lith = unit.lith[k];
                    if (lith_names.indexOf(unit_lith.name) === -1) {
                        units[i].coal = false;
                    }
                    else {
                        units[i].coal = true;

                        timeScale.forEach(function(el, ix) {
                            if (units[i].b_age > el.t_age && units[i].t_age < el.b_age) {
                                el.units++;
                            }
                        });
                        
                    }
                }
            }

            let labels = [];
            let values = [];

            for (let i = 0, j = timeScale.length; i < j; i++) {
                labels.push('"' + timeScale[i].t_age + '-' + timeScale[i].b_age + '"');
                values.push(timeScale[i].units);
            }

            console.log("done with units, starting server");
            startServer(labels.reverse(), values.reverse());
        }
    }

    Request(root + 'defs/lithologies?lith_type=organic', ql);
};

const startServer = function(labels, values) {
    Http.createServer(function(req, res) {  
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(`
            <!doctype html>  
            <html lang="en">  
            <meta charset="utf-8">  
            <title>Test web page on node.js</title>  
            <style>* {font-family:arial, sans-serif;}</style>  
            <body>  
            <h1>Chart</h1>  
            <canvas id="myChart" width="400" height="200"></canvas>  
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
            <script>
                var ctx = document.getElementById("myChart");

                var data = {
                    labels: [ ${ labels } ],
                    datasets: [{
                        label: 'Coal through time (units)',
                        backgroundColor: "#000",
                        borderColor: "#000",
                        data: [ ${ values } ],
                        fill: false
                    }]
                };

                var options = {
                    responsive: true,
                    title:{
                        display: false,
                        text:'Coal through time (units)'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Ma'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'No. of units'
                            }
                        }]
                    }
                };

                var myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: options
                });
            </script>
            </body>  
            </html>
        `);

        res.end();
    }).listen(8888, '127.0.0.1');

    console.log('Server running at http://127.0.0.1:8888');
};

calcUnits();

```

---

class: center, middle

# R

```
$ R --no-save --no-restore < coal-through-time.r
```

---

## Coal through time (units)

```R
# Original program by Noel Heim, Stanford University
# naheim@stanford.edu

api <- "https://macrostrat.org/api"

# get international timescale
timescale <- read.csv(
	file=URLencode(paste(
		api, "/defs/intervals?timescale=international ages&format=csv", 
		sep=""
	)), 
	header=TRUE
)

# make column for age midpoint, which is a convenience for plotting
timescale$mid_age <- apply(
	timescale[, match(c('b_age', 't_age'), colnames(timescale))], 1, mean
) 

# number of stages
nBins <- nrow(timescale) 

# get lithologies of type = organic
liths <- read.csv(
	file=URLencode(paste(
		api, "/defs/lithologies?lith_type=organic&format=csv", 
		sep=""
	)), 
	header=TRUE
)

# collapse all liths for use with grep, the "| " allows full word 
# searches of all
coalLiths <- paste(liths$name, collapse="| ")

# get terrestrial units in North America (project 1) & 
# Caribbean (project 7)
unitsParams <- "/units?project_id=1,7&environ_class=non-marine&format=csv&response=long"
units <- read.csv(
	file=URLencode(paste(
		api, unitsParams, 
		sep=""
	)), 
	header=TRUE
)

# for string matching to work, we need to convert the lith column to a 
# string in units, as well as in liths
units$lith <- as.character(units$lith)
liths$name <- as.character(liths$name)

# add column to units if unit has an organic lithology, boolean
# use grep to do matching
units$orgLith <- unlist(lapply(units$lith, grepl, pattern=coalLiths))

unitCounts <- data.frame(
	matrix(
		NA, 
		nrow=nBins, 
		ncol=2, 
		dimnames=list(timescale$name, c('total','coal'))
	)
)

for(i in 1:nBins) {
	temp <- subset(
		units, 
		b_age > timescale$t_age[i] & t_age < timescale$b_age[i]
	)
	
	unitCounts$total[i] <- nrow(temp)
	unitCounts$coal[i] <- nrow(subset(temp, orgLith == TRUE))
}

# a figure
pdf(file="coal-through-time.pdf", height=10, width=10)
par(pch=16, mfrow=c(2,1), mar=c(1.5, 4, 0.5, 0.5) + 0.1)

# raw time series
plot(
    timescale$mid_age, 
    unitCounts$total, 
    type='o', 
    lwd=2, 
    col='gray', 
    xlab="", 
    ylab="Number of units", 
    xlim=c(541,0)
)
lines(timescale$mid_age, unitCounts$coal, type='o', lwd=2)
legend(
    "topleft", 
    legend=c('all units', 'coal units'), 
    col=c('gray','black'), 
    pch=16, 
    pt.cex=1.5, 
    bty="n"
)

# proportional time series
par(mar=c(5, 4, 0.5, 0.5) + 0.1)
xPoly <- c(timescale$mid_age, rev(timescale$mid_age))
totalPoly <- c(unitCounts$coal/unitCounts$total, rep(1, nBins)); totalPoly[is.na(totalPoly)] <- 0
coalPoly <- c(rep(0, nBins), rev(unitCounts$coal/unitCounts$total)); coalPoly[is.na(coalPoly)] <- 0
plot(
    1:10, 
    type='n', 
    lwd=2, 
    xlab="Geologic time (Ma)", 
    ylab="Proportion of units", 
    xlim=c(541,0), 
    ylim=c(0,1)
)
polygon(xPoly, totalPoly, col='gray')
polygon(xPoly, coalPoly, col='black')
dev.off()
```

---

## Coal through time (units)

<img src="img/coal-through-time-units.png" width="100%">

---

## Coal through time (proportions)

<img src="img/coal-through-time-proportions.png" width="100%">

---

