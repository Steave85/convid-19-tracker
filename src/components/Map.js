import React from 'react';
import {useStateValue} from '../context/InfoProvider'
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import MapPopUp from './MapPopUp';
import '../styles/Map.css'

function Map({center, zoom}) {
    const [{data}] = useStateValue();
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                {MapPopUp(data)}
            </LeafletMap>
        </div>
    )
}

export default Map;
