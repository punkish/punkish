PK['circle'] = {
    data: {
        center : [34.764583, -118.725494], 
        zoom : 7,
        maxZoom: 18,
        points: [
            {
                "coords" : [34.764583, -118.725494]
            }
        ]
    },

    init: function() {

        // initialize the baselayer
		const baseLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: this.data.maxZoom,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

        let layers = [baseLayer];

        // initialize the map and add the layers to it
        this.map = L.map('map', {
            center: this.data.center,
            zoom: this.data.zoom,
            layers: layers
        });

        var marker = L.marker(this.data.center).addTo(this.map);
        marker.bindPopup("Tony D. was here").openPopup();
    }
}