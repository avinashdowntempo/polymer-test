import {
    LitElement,
    html,
    customElement,
    property,
    css
} from 'lit-element';

import L from 'leaflet';

export class MyElement extends LitElement {
    static get properties() {
        return {
            data: {
                type: Object
            },
            lat: {
                type: Number
            },
            long: {
                type: Number
            },
            store: {
                type: String
            },
            status: {
                type: String
            },
            network: {
                type: String
            },
            adress: {
                type: String
            }
        }
    }
    constructor() {
        super();
    }
    static get styles() {
        return css `
        :host {
          display: block;
        }`;
    }
    render() {
        return html `
            <style>
            #inner-popup p {
                margin: 5px !important;
              }
              #outage{
                background: #ffc9c9e8;
                color: #710808;
              }
              #impaired{
                background: #e0e0e0e8;
                color: #3a3a3a;
              }
              #inner-popup img {
                height: 18px !important;
                margin-right: 5px !important;
              }
              #inner-popup a{
                cursor: pointer;
                 color: #38f;
                 text-decoration: underline;
              }
              #inner-popup input {
                height: 20px !important;
                top: -5px !important;
                border: 0px !important;
                border-radius: 4px !important;
                background: #ffffff7a !important;
                position: relative !important;
              }
            </style>
            <div id="inner-popup">
            <strong>
              <p>Store:${this.store}</p>
            </strong>
            <p>Status:${this.status}</p>
            <p>Network Provider:${this.network}</p>
        
            <p>
              Adress:${this.adress}
            </p>
        
            <p>lat/long:${this.lat}/${this.long}</p>
            <p><img src="https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/535/original/tag.png"><input></p>
            <p><a @click=${this.emitZoomIn}>zoom to street</a>/<a @click=${this.emitZoomOut}>zoom out</a></p>
            <p><a>view store detail</a></p>
          </div>
      `;
    }

    emitZoomIn(e) {
        console.log("im emitting zoom-in");
        this.event = new CustomEvent('zoom-in', {
            bubbles: true,
            composed: true,
            detail: "zooming in" + this.lat + '<------>' + this.long
        });
        this.dispatchEvent(this.event);
    }
    emitZoomOut(e) {
        console.log("im emitting zoom-out");
        this.event = new CustomEvent('zoom-out', {
            bubbles: true,
            composed: true,
            detail: "zooming out" + this.lat + '<------>' + this.long
        });
        this.dispatchEvent(this.event);
    }
    firstUpdated(changedProperties) {

    }
}
customElements.define('map-popup', MyElement);