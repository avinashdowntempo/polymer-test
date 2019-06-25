import {
    LitElement,
    html,
    customElement,
    css,
    property
} from 'lit-element';

import L from 'leaflet';
import 'leaflet.vectorgrid';
import './map-popup';

export class MyElement extends LitElement {
    static get properties() {
        return {
            height: {
                type: Number
            },
            width: {
                type: Number
            },
            coord: {
                type: Object
            },
        }
    }
    constructor() {
        super();
        this.height = 800;
        this.width = 1000;
        this.markers = [];
        this.coord = {
            lat: 38.013,
            long: -95.845
        }
        this.impaired = 'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png'
        this.outage = 'https://cdn.iconscout.com/icon/free/png-256/location-62-93995.png';
    }
    render() {
        return html `
      <!-- ${this.script()} -->
      ${this.script()}
        <!-- ${this.script2()} -->
      <style>
      .leaflet-popup-content { 
        width:210px !important; 
        }
        .outage > div:first-child,.outage .leaflet-popup-tip{
            background: #ffc7d0d6 !important;
            color: #790000;
        }
        .impaired >  div:first-child,.impaired .leaflet-popup-tip{
            background: #e8e6e6e0 !important;
            color: #696969 !important;
        }
        </style>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
    <link rel="stylesheet" href="https://cdn.maptiler.com/mapbox-gl-js/v0.53.0/mapbox-gl.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css" />
    <link rel="stylesheet" href="https://cdn.maptiler.com/mapbox-gl-js/v0.53.0/mapbox-gl.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" />
      <div style="height:${this.height}px;width:${this.width}px" id="map"></div>
      `;
    }
    initMap(outageLayer) {
        this.startingZoom = 0;
        this.mapURLTemplate = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        this.mapAttribution =
            'Century Link Network Monitor';
        console.warn(this.shadowRoot.getElementById('map'));
        this.map = this.shadowRoot.getElementById('map');
        this.outageMap = L.map(this.map).setView(
            [this.coord.lat, this.coord.long],
            this.startingZoom
        );
        for (let key in outageLayer) {
            this.outageMap.addLayer(
                outageLayer[key]
            );
        }
    }
    script() {
        let newScript = document.createElement("script");
        newScript.src = "https://cdn.maptiler.com/mapbox-gl-js/v0.53.0/mapbox-gl.js";
        return newScript;
    }
    script2() {
        let newScript2 = document.createElement("script");
        newScript2.src = "https://cdn.maptiler.com/mapbox-gl-leaflet/latest/leaflet-mapbox-gl.js";
        return newScript2;
    }
    renderMap() {
        let pop = [];
        this.markers.forEach((element) => {

            this.Icon = L.icon({
                iconUrl: this[element.Status],
                iconSize: [25, 25], // size of the icon
            });
            let genMark;
            genMark = L.marker([element.lat, element.long], {
                icon: this.Icon
            });

            let popup = document.createElement("map-popup");
            popup.setAttribute("id", "map-popup-" + element.Store);
            popup.setAttribute("lat", element.lat);
            popup.setAttribute("long", element.long);
            popup.setAttribute("store", element.Store);
            popup.setAttribute("status", element.Status);
            popup.setAttribute("network", element.NetworkProvider);
            popup.setAttribute("adress", element.Adress);


            popup.addEventListener("zoom-in", e => {
                console.log(e.detail);
                this.outageMap.flyTo([element.lat, element.long], 18);
            });
            if (pop[element.Status] == null) {
                pop[element.Status] = [];
            }
            pop[element.Status].push(genMark.bindPopup(popup, {
                "className": element.Status
            }));

            popup.addEventListener("zoom-out", e => {
                console.log(e.detail);
                this.outageMap.setView([element.lat, element.long], 2);
            });
            console.log(test);

        });
        let keys = [];

        let overlayMaps = {};
        for (let key in pop) {
            keys.push(key);
            overlayMaps[key] = L.layerGroup(pop[key]);
        }
        let voyage = this.setMap('https://api.maptiler.com/maps/voyager/{z}/{x}/{y}.png?key=0OgAojd0rAD6HEk8bFut');
        let carto = this.setMap('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png');
        let dark = this.setMap('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png');
        let normal = this.setMap('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        let pastel = this.setMap('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.jpg?key=0OgAojd0rAD6HEk8bFut');
        let satellite = this.setMap('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=0OgAojd0rAD6HEk8bFut');

        // setTimeout(() => {

        // }, 1000);

        let totalMaps = Object.assign({}, overlayMaps);
        totalMaps['voyage'] = voyage;
        totalMaps['carto'] = carto;
        totalMaps['dark'] = dark;
        totalMaps['normal'] = normal;
        totalMaps['pastel'] = pastel;
        totalMaps['satellite'] = satellite;

        let basemaps = {
            "voyage": voyage,
            "carto": carto,
            "dark": dark,
            "normal": normal,
            "pastel": pastel,
            "satellite": satellite
        }

        let intervalID = setInterval(() => {
            // debugger;
            console.log(window.mapboxgl);
            if (window.mapboxgl) {


                let src = 'https://cdn.maptiler.com/mapbox-gl-leaflet/latest/leaflet-mapbox-gl.js';
                // document.write('<script src=' + src + '><\/script>');

                let head = this.shadowRoot.getElementById('map');
                let scriptmap = document.createElement('script');
                scriptmap.src = src;
                scriptmap.type = 'text/javascript';

                head.appendChild(scriptmap);
                clearInterval(intervalID);
                let newintervalID = setInterval(() => {
                    // if (true) {
                    let starbucks = L.mapboxGL({
                        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
                        accessToken: 'not-needed',
                        // maxZoom: 17,
                        // minZoom: 2,
                        // zoom: 0,
                        style: 'https://api.maptiler.com/maps/f9bad233-457b-4210-9cc8-5f48e145df57/style.json?key=0OgAojd0rAD6HEk8bFut'
                    });
                    let starblack = L.mapboxGL({
                        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
                        accessToken: 'not-needed',
                        // minZoom: 2,
                        style: 'https://api.maptiler.com/maps/88228ffd-6a54-4607-a56e-20cad4be7185/style.json?key=0OgAojd0rAD6HEk8bFut'
                    });
                    let chickfila = L.mapboxGL({
                        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
                        accessToken: 'not-needed',
                        // maxZoom: 17,
                        // minZoom: 2,
                        // zoom: 0,
                        style: 'https://api.maptiler.com/maps/f4ee877e-18aa-4a6a-bbf1-12d4d0659268/style.json?key=0OgAojd0rAD6HEk8bFut'
                    });
                    // .addTo(this.outageMap)
                   
                    basemaps['starblack'] = starblack;
                    basemaps['chickfila'] = chickfila;
                    basemaps['starbucks'] = starbucks;

                    this.outageMap.addLayer(starbucks);
                    this.outageMap.addLayer(chickfila);
                    this.outageMap.addLayer(starblack);



                    L.control.layers(basemaps, overlayMaps).addTo(this.outageMap);
                    clearInterval(newintervalID);
                    // }
                }, 10);

            }

        }, 1000);
        this.initMap(totalMaps);
        // L.control.layers(basemaps, overlayMaps).addTo(this.outageMap);
        // L.control.layers(basemaps, overlayMaps).addTo(this.outageMap);
    }
    setMap(url) {
        return L.tileLayer(url, {
            attribution: this.mapAttribution,
            maxZoom: 18,
            minZoom: 2,
            crossOrigin: true
        });
    }

    firstUpdated(changedProperties) {
        console.warn("map is loaded");
        clearInterval(this.myVar);

        this.event = new CustomEvent('map-loaded', {
            bubbles: true,
            composed: true,
            detail: "map is loaded"
        });
        this.dispatchEvent(this.event);

    }

}
customElements.define('map-element', MyElement);