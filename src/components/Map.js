import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../api"; // import the API instance

function MapComponent() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const response = await api.get("/businesses");
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    }

    fetchBusinesses();
  }, []);

  const defaultCenter = [38.89511, -77.03637]; // Washington DC coordinates
  const defaultZoom = 13;

  return (
    <div>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {businesses.map((business) => (
          <Marker
            key={business._id}
            position={business.location.coordinates.reverse()}
          >
            <Popup>
              <strong>{business.name}</strong>
              <br />
              {business.location.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
