
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import GoogleMapsLoader from './GoogleMapsLoader';
import './Maps.css';

const mapContainerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '8px',
  marginBottom: '1rem'
};

interface DestinationMapProps {
  lat: number;
  lng: number;
  destination: string;
}

const DestinationMap: React.FC<DestinationMapProps> = ({ lat, lng, destination }) => {
  const center = {
    lat: lat,
    lng: lng
  };

  // Generate a unique key to force re-render when coordinates change
  const mapKey = `map-${lat}-${lng}`;
  
  return (
    <div className="destination-map-container">
      <GoogleMapsLoader>
        {/* Key prop ensures map rerenders when coordinates change */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
          key={mapKey}
        >
          <Marker 
            position={center} 
            title={destination}
          />
        </GoogleMap>
      </GoogleMapsLoader>
    </div>
  );
};

export default DestinationMap;
