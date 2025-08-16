
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CircleFlag } from 'react-circle-flags';
import './LeafletMap.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
  center?: [number, number];
  markers?: {
    position: [number, number];
    popup?: string;
    countryCode?: string;
  }[];
  zoom?: number;
  mapKey?: number;
  showControls?: boolean;
  onMapClick?: (latlng: L.LatLng) => void;
}

interface FlyToProps {
  position: [number, number];
  zoom?: number;
}

// FlyTo component to animate map movement
const FlyTo: React.FC<FlyToProps> = ({ position, zoom = 13 }) => {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(position, zoom, {
      duration: 2
    });
  }, [map, position, zoom]);
  
  return null;
};

// Create custom icons for markers
const createCustomIcon = (countryCode?: string) => {
  if (!countryCode) {
    return new L.Icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });
  }
  
  // Create a marker with a country flag
  const flagMarker = L.divIcon({
    className: 'custom-marker-icon',
    html: `<div class="flag-marker-container">
            <div class="flag-container">
              <img src="https://flagcdn.com/w40/${countryCode.toLowerCase()}.png" alt="${countryCode}" />
            </div>
            <div class="marker-point"></div>
          </div>`,
    iconSize: [40, 60],
    iconAnchor: [20, 50],
    popupAnchor: [0, -45]
  });
  
  return flagMarker;
};

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [28.6139, 77.2090], // Default to Delhi
  markers = [],
  zoom = 5,
  mapKey = 1,
  showControls = false,
  onMapClick
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [mapZoom, setMapZoom] = useState<number>(zoom);

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  useEffect(() => {
    setMapZoom(zoom);
  }, [zoom]);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (onMapClick) {
      onMapClick(e.latlng);
    }
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: '400px', width: '100%' }}
      className="leaflet-map-container"
      key={mapKey}
      zoomControl={showControls}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                    <CircleFlag countryCode={marker.countryCode.toLowerCase()} height={30} />
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
