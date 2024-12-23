import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HotelMap = () => {
    const position = [-33.8688, 151.2093]; // Sydney, Australia

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }} // Inherit from parent container
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>Hotel Inner Heritage is located here!</Popup>
            </Marker>
        </MapContainer>
    );
};

export default HotelMap;
