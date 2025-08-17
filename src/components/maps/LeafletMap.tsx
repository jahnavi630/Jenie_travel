import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MarkerData {
  position: LatLngExpression;
  popup?: string;
  countryCode?: string;
}

interface LeafletMapProps {
  center?: LatLngExpression;
  markers?: MarkerData[];
  zoom?: number;
  mapKey?: number;
  showControls?: boolean;
  onMapClick?: (latlng: L.LatLng) => void;
}

interface FlyToProps {
  position: LatLngExpression;
  zoom?: number;
}

const FlyTo: React.FC<FlyToProps> = ({ position, zoom = 13 }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, zoom, { duration: 2 });
  }, [map, position, zoom]);
  return null;
};

const createCustomIcon = (countryCode?: string) => {
  if (!countryCode) return DefaultIcon;
  return L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div class="flag-marker-container">
        <div class="flag-container">
          <img src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" alt="${countryCode}" />
        </div>
        <div class="marker-point"></div>
      </div>
    `,
    iconSize: [40, 60],
    iconAnchor: [20, 50],
    popupAnchor: [0, -45],
  });
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [28.6139, 77.209],
  markers = [],
  zoom = 5,
  mapKey = 1,
  showControls = false,
  onMapClick,
}) => {
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(center);
  const [mapZoom, setMapZoom] = useState<number>(zoom);

  useEffect(() => setMapCenter(center), [center]);
  useEffect(() => setMapZoom(zoom), [zoom]);

  const handleMapClick = (e: LeafletMouseEvent) => onMapClick?.(e.latlng);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: "400px", width: "100%" }}
      className="leaflet-map-container"
      key={mapKey}
      zoomControl={showControls}
      whenReady={(map) => map.target.on("click", handleMapClick)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <FlyTo position={mapCenter} zoom={mapZoom} />

      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}`}
          position={marker.position}
          icon={createCustomIcon(marker.countryCode)}
        >
          {marker.popup && (
            <Popup>
              <div className="custom-popup">
                {marker.countryCode && (
                  <div className="popup-flag">
                    <img
                      src={`https://flagcdn.com/w40/${marker.countryCode.toLowerCase()}.png`}
                      alt={marker.countryCode}
                      height={30}
                    />
                  </div>
                )}
                <div className="popup-content">{marker.popup}</div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
