
import React from 'react';
import './HeroSection.css';
import LeafletMap from '../maps/LeafletMap';

interface HeroSectionProps {
  destination: string;
  setDestination: (value: string) => void;
  startingPoint: string;
  setStartingPoint: (value: string) => void;
  budget: string;
  setBudget: (value: string) => void;
  onGeneratePlan: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  destination,
  setDestination,
  startingPoint,
  setStartingPoint,
  budget,
  setBudget,
  onGeneratePlan
}) => {
  const showRouteMap = startingPoint && destination;
  
  // Define dummy coordinates for demonstration purposes
  // In a real app, you would use a geocoding service to get actual coordinates
  const startCoordinates: [number, number] = [20.5937, 78.9629]; // Default to center of India
  const endCoordinates: [number, number] = [28.6139, 77.2090]; // Default to Delhi
  
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Begin Your Journey with Jenie</h1>
          <p className="hero-subtitle">Your AI Travel Companion</p>
        </div>
        
        <div className="hero-form-container">
          <div className="hero-form card">
            <h2 className="hero-form-title">Where to next?</h2>
            
            <div className="form-group">
              <label htmlFor="startingPoint">Starting Point</label>
              <input
                type="text"
                id="startingPoint"
                className="form-control"
                placeholder="Where are you starting from?"
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="budget">Budget (in $)</label>
              <input
                type="number"
                id="budget"
                className="form-control"
                placeholder="Enter your budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            
            <button 
              className="btn btn-primary hero-btn"
              onClick={onGeneratePlan}
            >
              Generate Plan
            </button>
            
            {/* Display Leaflet map if both starting point and destination are provided */}
            {showRouteMap && (
              <div className="hero-route-map">
                <LeafletMap
                  startPoint={{
                    name: startingPoint,
                    coordinates: startCoordinates
                  }}
                  endPoint={{
                    name: destination,
                    coordinates: endCoordinates
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
