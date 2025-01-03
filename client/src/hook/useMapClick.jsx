import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const useMapClick = (initialCenter = [51.505, -0.09], initialZoom = 13) => {
  const [location, setLocation] = useState(null);

  const MapWithClick = () => {
    useMapEvents({
      click: (e) => {
        setLocation([e.latlng.lat, e.latlng.lng]);
      },
    });
    return location ? <Marker position={location} /> : null;
  };

  const MapComponent = () => (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapWithClick />
    </MapContainer>
  );

  return { location, MapComponent };
};

export default useMapClick;
