
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import LeafletMap from '../maps/LeafletMap';
import './TravelPlan.css';

interface TravelDetails {
  startingPoint: string;
  destination: string;
  budget: string;
  timestamp: string;
}

// Simple geocoding function to get coordinates for cities
// In a real app, you would use a geocoding service
const getCoordinates = (cityName: string): [number, number] => {
  const cityCoordinates: {[key: string]: [number, number]} = {
    "new delhi": [28.6139, 77.2090],
    "delhi": [28.6139, 77.2090],
    "mumbai": [19.0760, 72.8777],
    "kolkata": [22.5726, 88.3639],
    "chennai": [13.0827, 80.2707],
    "bangalore": [12.9716, 77.5946],
    "hyderabad": [17.3850, 78.4867],
    "pune": [18.5204, 73.8567],
    "ahmedabad": [23.0225, 72.5714],
    "jaipur": [26.9124, 75.7873],
    "surat": [21.1702, 72.8311],
    "lucknow": [26.8467, 80.9462],
    "kanpur": [26.4499, 80.3319],
    "nagpur": [21.1458, 79.0882],
    "visakhapatnam": [17.6868, 83.2185],
    "vizag": [17.6868, 83.2185],
    "bhopal": [23.2599, 77.4126],
    "patna": [25.5941, 85.1376],
    "goa": [15.2993, 74.1240],
    // Default to center of India if city not found
    "default": [20.5937, 78.9629]
  };
  
  const lowerCityName = cityName.toLowerCase();
  
  // Try to find exact match
  if (cityCoordinates[lowerCityName]) {
    return cityCoordinates[lowerCityName];
  }
  
  // Try to find partial match
  for (const city in cityCoordinates) {
    if (lowerCityName.includes(city) || city.includes(lowerCityName)) {
      return cityCoordinates[city];
    }
  }
  
  return cityCoordinates.default;
};

const TravelPlan: React.FC = () => {
  const [travelDetails, setTravelDetails] = useState<TravelDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<string[]>([]);

  useEffect(() => {
    const storedDetails = localStorage.getItem('travelDetails');
    if (storedDetails) {
      setTravelDetails(JSON.parse(storedDetails));
    }
  }, []);

  useEffect(() => {
    if (travelDetails) {
      generatePlan();
    }
  }, [travelDetails]);

  const generatePlan = () => {
    if (!travelDetails) return;
    
    setIsLoading(true);
    
    // Simulate API call to generate plan
    setTimeout(() => {
      const { startingPoint, destination, budget } = travelDetails;
      
      // Generate itinerary based on details
      const generatedPlan = [
        `Day 1: Depart from ${startingPoint} to ${destination}`,
        `Day 2: Explore the main attractions of ${destination}`,
        `Day 3: Outdoor adventures in the mountains near ${destination}`,
        `Day 4: Cultural experience in ${destination}`,
        `Day 5: Return to ${startingPoint}`
      ];
      
      // Generate budget breakdown
      const budgetNum = parseInt(budget) || 1000;
      const accommodationBudget = Math.round(budgetNum * 0.4);
      const transportBudget = Math.round(budgetNum * 0.2);
      const foodBudget = Math.round(budgetNum * 0.25);
      const activitiesBudget = Math.round(budgetNum * 0.15);
      
      const budgetBreakdown = [
        `Total Budget: $${budget}`,
        `Accommodation: $${accommodationBudget} (40%)`,
        `Transportation: $${transportBudget} (20%)`,
        `Food & Drinks: $${foodBudget} (25%)`,
        `Activities & Sightseeing: $${activitiesBudget} (15%)`
      ];
      
      setPlan([...generatedPlan, '', ...budgetBreakdown]);
      setIsLoading(false);
    }, 1500);
  };

  if (!travelDetails) {
    return (
      <Card className="travel-plan-card">
        <CardHeader>
          <CardTitle>No Travel Plan Generated</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please enter your travel details and click "Generate Plan" to create an itinerary.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="travel-plan-card">
      <CardHeader>
        <CardTitle>Your Mountain Adventure Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="plan-header">
          <div className="plan-destination">
            <span className="label">From:</span> {travelDetails.startingPoint}
          </div>
          <div className="plan-destination">
            <span className="label">To:</span> {travelDetails.destination}
          </div>
          <div className="plan-budget">
            <span className="label">Budget:</span> ${travelDetails.budget}
          </div>
        </div>
        
        <div className="plan-image-container">
          <img 
            src={`https://source.unsplash.com/random?${travelDetails.destination},mountains`}
            alt={`${travelDetails.destination} mountains`}
            className="plan-image"
          />
        </div>
        
        {/* Add Leaflet Map */}
        {!isLoading && (
          <LeafletMap
            startPoint={{
              name: travelDetails.startingPoint,
              coordinates: getCoordinates(travelDetails.startingPoint)
            }}
            endPoint={{
              name: travelDetails.destination,
              coordinates: getCoordinates(travelDetails.destination)
            }}
          />
        )}
        
        {isLoading ? (
          <div className="plan-loading">
            <p>Generating your travel plan...</p>
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="plan-content">
            <h3>Your Itinerary</h3>
            <ul className="plan-list">
              {plan.map((item, index) => (
                item ? <li key={index}>{item}</li> : <div key={index} className="plan-divider"></div>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TravelPlan;
