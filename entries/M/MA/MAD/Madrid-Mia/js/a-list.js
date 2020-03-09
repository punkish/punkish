PK['a-list'] = {
    data: {
        imgDir: 'public/img/map-markers',
        center : [40.4086263, -3.7067043], 
        zoom : 13,
        maxZoom: 18,
        points: [
            {
                "name" : "Mamua",
                "type" : "café",
                "coords" : [40.4103244, -3.7092831],
                "desc" : "nice place to have good food, coffee, and breakfast at a reasonable price",
                "source" : "Tony",
                "addr" : "Plaza de Cascorro, 7, 28005 Madrid",
                "url"  : "mamua.es",
                "ph"   : "+34 910 13 97 11"
            },
            {
                "name" : "El Pavon Teatro Kamikaze",
                "type" : "theater",
                "coords" : [40.410031,-3.7083439],
                "desc" : "very nice theater with many salas and a restaurant, high quality productions, great posters",
                "source" : "me",
                "addr" : "Calle de Embajadores, 9, 28012 Madrid", 
                "url" : "teatrokamikaze.com",
                "ph" : "+34 910 51 33 31"
            },
            {
                "name" : "Matadero Madrid",
                "type" : "arts",
                "coords" : [40.3912894, -3.6999277],
                "desc" : "a former abattoir turned into a gorgeous arts complex, free and open to the public (events require paid tickets), with many galleries, design Madrid, and a couple of cafés",
                "source" : "me",
                "addr" : "Plaza de Legazpi, 8, 28045 Madrid", 
                "url" : "mataderomadrid.org",
                "ph" : "+34 913 18 46 70"
            },
            {
                "name" : "Tabacalera",
                "type" : "arts",
                "coords" : [40.4062236, -3.7052019],
                "desc" : "a former tobacco factory turned into a public center for the arts with several art galleries showing contemporary artists",
                "source" : "Tony",
                "addr" : "Calle de Embajadores, 53, 28012 Madrid", 
                "url" : "latabacalera.net",
                "ph" : ""
            },
            {
                "name" : "La Casa Encendida",
                "type" : "arts",
                "coords" : [40.4060799, -3.7021081],
                "desc" : "a modern center for the arts with a lovely little library and a gorgeous café",
                "source" : "Tony",
                "addr" : "Ronda de Valencia, 2, 28012 Madrid", 
                "url" : "lacasaencendida.es",
                "ph" : "+34 915 06 21 80"
            },
            {
                "name" : "Cine Doré",
                "type" : "cine",
                "coords" : [40.41164, -3.7011843],
                "desc" : "a beautiful film theater, home of filmoteca nacional, showing classics all year round for €3 or less",
                "source" : "Tony",
                "addr" : "Calle de Santa Isabel, 3, 28012 Madrid", 
                "url" : "mecd.gob.es",
                "ph" : "+34 913 69 32 25"
            },
            {
                "name" : "El Imparcial",
                "type" : "restaurant",
                "coords" : [40.4119262, -3.7081111],
                "desc" : "former newspaper office turned into a stylish bar and café",
                "source" : "Tony",
                "addr" : "Calle del Duque de Alba, 4, 28012 Madrid", 
                "url" : "elimparcialmadrid.com",
                "ph" : "+34 917 95 89 86",
                "maxi": true
            },
            {
                "name" : "Vinicola Mentridana",
                "type" : "drinks",
                "coords" : [40.4106612, -3.7000247],
                "desc" : "lovely wine bar on a hip street",
                "srce" : "Tony",
                "addr" : "Calle de San Eugenio, 9, 28012 Madrid", 
                "url" : "",
                "ph" : "+34 912 65 93 82"
            },
            {
                "name" : "La Falda",
                "type" : "drinks",
                "coords" : [40.4106612, -3.7000247],
                "desc" : "a nice neighborhood bar for drinks",
                "srce" : "Laura",
                "addr" : "Calle de Miguel Servet, 4, 28012 Madrid", 
                "url" : "lafalda.es",
                "ph" : "+34 911 68 80 96"
            },
            {
                "name" : "El Boquerón",
                "type" : "restaurant",
                "coords" : [40.4074456, -3.7026342],
                "desc" : "a very Madrid stand-up wine bar with gambas planchas and not much else. Oh, and very crowded, obviously, very good",
                "source" : "Tony",
                "addr" : "Calle de Valencia, 14, 28012 Madrid", 
                "url" : "",
                "ph" : "+34 915 27 63 80"
            },
            {
                "name" : "La Cabra en el Tejado",
                "type" : "drinks",
                "coords" : [40.4092985, -3.7117586],
                "desc" : "a lovely neighborhood bar with a great name",
                "source" : "Tony",
                "addr" : "Calle de Santa Ana, 29, 28005 Madrid", 
                "url" : "",
                "ph" : "+34 910 33 33 59"
            },
            {
                "name" : "Taberna de Antonio Sánchez",
                "type" : "drinks",
                "coords" : [48.85622, 2.36099],
                "desc" : "a more-than-150-years old bar",
                "source" : "Tony",
                "addr" : "Calle del Mesón de Paredes, 13, 28013 Madrid", 
                "url" : "",
                "ph" : "+34 915 39 78 26"
            },
            {
                "name" : "Panifiesto",
                "type" : "bakery",
                "coords" : [48.86623, 2.3395],
                "desc" : "probably the best bread this side of France",
                "source" : "me",
                "addr" : "Calle del Mesón de Paredes, 10, 28012 Madrid", 
                "url" : "panifiesto.es",
                "ph" : "+34 694 44 90 20"
            }
        ]
    },

    // create custom icons for each layerGroup
    classifyPoints: function() {
        
        let layerGroups = {
            'café': {
                iconUrl: `${PK['a-list'].data.imgDir}/cafe-coffee.svg`,
                markers: [],
                layerGroup: null
            },
            'theater': {
                iconUrl: `${PK['a-list'].data.imgDir}/hidden-delight.svg`,
                markers: [],
                layerGroup: null
            },
            'arts': {
                iconUrl: `${PK['a-list'].data.imgDir}/hidden-delight.svg`,
                markers: [],
                layerGroup: null
            },
            'cine': {
                iconUrl: `${PK['a-list'].data.imgDir}/hidden-delight.svg`,
                markers: [],
                layerGroup: null
            },
            'restaurant': {
                iconUrl: `${PK['a-list'].data.imgDir}/cafe-food.svg`,
                markers: [],
                layerGroup: null
            },
            'drinks': {
                iconUrl: `${PK['a-list'].data.imgDir}/cafe-drinks.svg`,
                markers: [],
                layerGroup: null
            },
            'bakery': {
                iconUrl: `${PK['a-list'].data.imgDir}/cafe-coffee.svg`,
                markers: [],
                layerGroup: null
            },
            
            
            // 'hidden delight': {
            //     iconUrl: `${imgDir}/hidden-delight.svg`,
            //     markers: [],
            //     layerGroup: null
            // }
        };

        // add icons to each layerGroup
        for (let i in layerGroups) {
            let lg = layerGroups[i];
            lg.icon = L.icon({ 
                iconUrl: lg.iconUrl, 
                iconSize: [32, 32],
                iconAnchor: [16, 16],
				popupAnchor: [1, -3]
            })
        }

        // add points to each layerGroup
        this.data.points.forEach(function(point) {
            const popupHtml =  
                `<div class='punkish-map-name'>
                    <a href='${point.url}' target='_blank'>${point.name}</a>
                </div>
                <div class='punkish-map-type'>${point.addr}</div>
                <div class='punkish-map-desc'>${point.desc}</div>`;

            layerGroups[point.type].markers.push(
                L.marker(
                    point.coords, 
                    {icon: layerGroups[point.type].icon}
                ).bindPopup(popupHtml)
            );
        });

        // add individual layerGroups
        for (let i in layerGroups) {
            let lg = layerGroups[i];
            lg.layerGroup = L.layerGroup(lg.markers)
        }

        return layerGroups;
    },

    "init": function() {

        // initialize the baselayer
		const baseLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: this.data.maxZoom,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

        let layers = [baseLayer];
        let layerControl = {};

        // assign points to layerGroups
        const layerGroups = this.classifyPoints();
        
        // create layers and layerControl for the map
        for (let i in layerGroups) {
            let lg = layerGroups[i];
            layers.push(lg.layerGroup);
            layerControl[i] = lg.layerGroup;
        }

        // initialize the map and add the layers to it
        this.map = L.map('map', {
            center: this.data.center,
            zoom: this.data.zoom,
            layers: layers
        });

        const home = L.marker(
            [40.4086263, -3.7067043],
            {
                icon: L.icon({ 
                    iconUrl: `${PK['a-list'].data.imgDir}/home.svg`, 
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                    popupAnchor: [1, -3]
                })
            }
        ).addTo(this.map);

        // add the layerControl
        L.control.layers(null, layerControl).addTo(this.map);
    }
}