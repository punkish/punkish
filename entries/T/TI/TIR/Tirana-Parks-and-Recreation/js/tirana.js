PK['qgismapper'] = {
    init: function() {
        var highlightLayer;

        function highlightFeature(e) {
            highlightLayer = e.target;

            if (e.target.feature.geometry.type === 'LineString') {
                highlightLayer.setStyle({
                color: '#ffff00',
                });
            } else {
                highlightLayer.setStyle({
                fillColor: '#ffff00',
                fillOpacity: 1
                });
            }
        }
        L.ImageOverlay.include({
            getBounds: function () {
                return this._bounds;
            }
        });
        var map = L.map('map', {
            zoomControl:true, maxZoom:28, minZoom:5
        }).fitBounds([[41.3043791027,19.8082478662],[41.320070711,19.8384106441]]);
        var hash = new L.Hash(map);
        map.attributionControl.addAttribution('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a>');
        var feature_group = new L.featureGroup([]);
        var bounds_group = new L.featureGroup([]);
        var raster_group = new L.LayerGroup([]);

        var basemap0 = L.mapboxGL({
            attribution: '<a href="http://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap contributors</a>',
            accessToken: 'not-needed',
            style: 'https://maps.tilehosting.com/styles/positron/style.json?key=MieHXxNkl2MjgsRI57s0'
            }).addTo(map);

        //basemap0.addTo(map);
        function setBounds() {
        }

        function geoJson2heat(geojson, weight) {
            return geojson.features.map(function(feature) {
            return [
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
                feature.properties[weight]
            ];
            });
        }

        function pop_parcels0(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    layer.setStyle(doStyleparcels0(feature));

                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><td colspan="2">' + (feature.properties['gid'] !== null ? Autolinker.link(String(feature.properties['gid'])) : '') + '</td></tr><tr><td colspan="2">' + (feature.properties['admapkey'] !== null ? Autolinker.link(String(feature.properties['admapkey'])) : '') + '</td></tr><tr><th scope="row">shapename</th><td>' + (feature.properties['shapename'] !== null ? Autolinker.link(String(feature.properties['shapename'])) : '') + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleparcels0(feature) {
            return {
                weight: 1.04,
                color: '#000000',
                fillColor: '#d7f96e',
                dashArray: '',
                lineCap: 'square',
                lineJoin: 'bevel',
                opacity: 1.0,
                fillOpacity: 1.0
            };
        }

        map.createPane('pane_parcels0');
        map.getPane('pane_parcels0').style.zIndex = 601;
        var json_parcels0JSON = new L.geoJson(json_parcels0, {
            pane: 'pane_parcels0',
            onEachFeature: pop_parcels0,
            style: doStyleparcels0
        });
        bounds_group.addLayer(json_parcels0JSON);
        feature_group.addLayer(json_parcels0JSON);
        raster_group.addTo(map);
        feature_group.addTo(map);
        var baseMaps = {'OSM HOT': basemap0};
        L.control.layers(baseMaps,{'<img src="/entry-files/{{entryDir}}/img/parcels0.png" /> parcels': json_parcels0JSON,},{collapsed:false}).addTo(map);
        setBounds();
        map.addControl(new L.Control.Search({
            layer: feature_group,
            initial: false,
            hideMarkerOnCollapse: true,
            propertyName: 'shapename'}));
    }
};