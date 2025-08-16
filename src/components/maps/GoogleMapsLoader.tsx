
import React, { useState } from 'react';
import { LoadScript, Libraries } from '@react-google-maps/api';

// This is a dummy API key placeholder - get a real one from Google Cloud Console
const GOOGLE_MAPS_API_KEY = 'AIzaSyA5xkjDMBtGTdP_XAfXlPQNXlHFmRmfhKw';

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}

// Define libraries array outside component to prevent unnecessary re-renders
// Use proper type for Libraries
const libraries: Libraries = ['places', 'geometry'];

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({ children }) => {
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  const handleError = () => {
    console.error('Google Maps failed to load');
    setLoadError(true);
  };
  
  const handleLoad = () => {
    console.log('Google Maps loaded successfully');
    setIsLoaded(true);
  };

  return (
    <>
      {loadError ? (
        <div className="maps-error-container">
          <div className="maps-error-message">
            <h3>Map Loading Error</h3>
            <p>We couldn't load Google Maps at this time. Please try again later.</p>
          </div>
        </div>
      ) : (
        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          onError={handleError}
          onLoad={handleLoad}
          libraries={libraries}
          loadingElement={
            <div className="maps-loading-container">
              <div className="map-loading-spinner"></div>
              <p>Loading Maps...</p>
            </div>
          }
        >
          {children}
        </LoadScript>
      )}
    </>
  );
};

export default GoogleMapsLoader;
