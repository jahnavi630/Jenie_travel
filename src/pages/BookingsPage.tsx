
import React, { useEffect, useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import { format } from 'date-fns';
import { Button } from '../components/ui/button';
import { CalendarIcon, MapPin } from 'lucide-react';
import TransportBooking from '../components/transport/TransportBooking';
import LeafletMap from '../components/maps/LeafletMap';
import BackButton from '../components/common/BackButton';
import './PageStyles.css';
import './PageBackground.css';

// City coordinates for common destinations
const cityCoordinates: {[key: string]: [number, number]} = {
  'Delhi': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Bangalore': [12.9716, 77.5946],
  'Kolkata': [22.5726, 88.3639],
  'Chennai': [13.0827, 80.2707],
  'Hyderabad': [17.3850, 78.4867],
  'Jaipur': [26.9124, 75.7873],
  'Goa': [15.2993, 74.1240],
  'Kochi': [9.9312, 76.2673],
  'Varanasi': [25.3176, 83.0130],
  'Agra': [27.1767, 78.0081],
  'Shimla': [31.1048, 77.1734],
  'Manali': [32.2396, 77.1887],
  'Darjeeling': [27.0410, 88.2663],
  'Rishikesh': [30.0869, 78.2676],
  'New York': [40.7128, -74.0060],
  'London': [51.5074, -0.1278],
  'Paris': [48.8566, 2.3522],
  'Tokyo': [35.6762, 139.6503],
  'Dubai': [25.2048, 55.2708],
  'Singapore': [1.3521, 103.8198],
  'Bangkok': [13.7563, 100.5018],
  'Sydney': [33.8688, 151.2093],
  'Cape Town': [-33.9249, 18.4241],
  'Rio de Janeiro': [-22.9068, -43.1729]
};

// Get coordinates for a city name, with fallback
const getCoordinates = (cityName: string): [number, number] => {
  // Try to match the city name directly
  if (cityCoordinates[cityName]) {
    return cityCoordinates[cityName];
  }
  
  // Try to find a partial match
  const cityKey = Object.keys(cityCoordinates).find(key => 
    cityName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cityName.toLowerCase())
  );
  
  if (cityKey) {
    return cityCoordinates[cityKey];
  }
  
  // Default to center of India if no match
  return [20.5937, 78.9629];
};

const BookingsPage: React.FC = () => {
  const [travelDetails, setTravelDetails] = useState<any>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [startCoordinates, setStartCoordinates] = useState<[number, number]>([20.5937, 78.9629]);
  const [endCoordinates, setEndCoordinates] = useState<[number, number]>([28.6139, 77.2090]);
  
  useEffect(() => {
    // Get travel details from localStorage if available
    const storedDetails = localStorage.getItem('travelDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setTravelDetails(details);
      
      // Set coordinates based on stored destinations
      if (details.startingPoint) {
        setStartCoordinates(getCoordinates(details.startingPoint));
      }
      
      if (details.destination) {
        setEndCoordinates(getCoordinates(details.destination));
      }
    }
  }, []);
  
  return (
    <div className="page-background bookings-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          <h1 className="page-title">Bookings</h1>
          
          {travelDetails ? (
            <>
              <div className="alert-card">
                <h3>Your Travel Plan</h3>
                <p><MapPin size={16} className="inline-icon" /> Starting Point: <strong>{travelDetails.startingPoint}</strong></p>
                <p><MapPin size={16} className="inline-icon" /> Destination: <strong>{travelDetails.destination}</strong></p>
                <p>Budget: <strong>${travelDetails.budget}</strong></p>
                
                <div className="travel-dates">
                  <div className="date-picker-container">
                    <div className="date-picker-label">
                      <CalendarIcon size={16} />
                      <span>Departure Date</span>
                    </div>
                    <div className="date-display">
                      {departureDate && format(departureDate, 'PPP')}
                    </div>
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      className="date-calendar"
                    />
                  </div>
                  
                  <div className="date-picker-container">
                    <div className="date-picker-label">
                      <CalendarIcon size={16} />
                      <span>Return Date</span>
                    </div>
                    <div className="date-display">
                      {returnDate && format(returnDate, 'PPP')}
                    </div>
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      className="date-calendar"
                    />
                  </div>
                </div>
                
                <Button className="update-plan-btn">
                  Update Travel Plan
                </Button>
              </div>
              
              {/* Show LeafletMap with coordinates based on destination */}
              <div className="travel-route-map card">
                <h3>Your Route</h3>
                <LeafletMap
                  startPoint={{
                    name: travelDetails.startingPoint,
                    coordinates: startCoordinates
                  }}
                  endPoint={{
                    name: travelDetails.destination,
                    coordinates: endCoordinates
                  }}
                  height="500px"
                  interactive={true}
                />
              </div>
            </>
          ) : (
            <div className="alert-card">
              <h3>No Travel Plan Set</h3>
              <p>Return to the home page to create a travel plan first!</p>
              <Button asChild className="mt-4">
                <a href="/">Create Travel Plan</a>
              </Button>
            </div>
          )}
          
          <section className="page-section">
            <h2 className="section-title">Find and Book Transport</h2>
            <TransportBooking />
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
