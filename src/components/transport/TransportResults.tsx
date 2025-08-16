
import React from 'react';
import './TransportResults.css';
import { Button } from '../ui/button';
import { Clock, MapPin } from 'lucide-react';

export interface TransportResultsProps {
  formData: {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    passengers: number;
    transportType: string;
  };
  onBack: () => void;
  onBook: (amount: number, description: string) => void;
}

const TransportResults: React.FC<TransportResultsProps> = ({ formData, onBack, onBook }) => {
  const results = [
    {
      id: 1,
      name: formData.transportType === 'flight' ? 'Indigo Airlines' : 
            formData.transportType === 'train' ? 'Rajdhani Express' : 'RedBus Volvo',
      class: formData.transportType === 'flight' ? 'Economy' : 
             formData.transportType === 'train' ? 'AC 2-Tier' : 'AC Sleeper',
      departure: {
        time: '07:15',
        city: formData.from
      },
      arrival: {
        time: '09:45',
        city: formData.to
      },
      duration: '2h 30m',
      price: formData.transportType === 'flight' ? 5899 : 
             formData.transportType === 'train' ? 1450 : 950,
      details: formData.transportType === 'flight' ? 'Direct, Non-stop' : 
               formData.transportType === 'train' ? 'Train No: 12301' : 'Sleeper (2+1)'
    },
    {
      id: 2,
      name: formData.transportType === 'flight' ? 'Air India' : 
            formData.transportType === 'train' ? 'Shatabdi Express' : 'Travels SRM',
      class: formData.transportType === 'flight' ? 'Economy' : 
             formData.transportType === 'train' ? 'Executive Chair Car' : 'AC Seater',
      departure: {
        time: '10:30',
        city: formData.from
      },
      arrival: {
        time: '13:15',
        city: formData.to
      },
      duration: '2h 45m',
      price: formData.transportType === 'flight' ? 6499 : 
             formData.transportType === 'train' ? 1899 : 1100,
      details: formData.transportType === 'flight' ? 'Direct, Free Meal' : 
               formData.transportType === 'train' ? 'Train No: 12005' : 'Semi-Sleeper'
    },
    {
      id: 3,
      name: formData.transportType === 'flight' ? 'Vistara' : 
            formData.transportType === 'train' ? 'Duronto Express' : 'Greenline',
      class: formData.transportType === 'flight' ? 'Premium Economy' : 
             formData.transportType === 'train' ? 'AC 1st Class' : 'Super Deluxe',
      departure: {
        time: '16:45',
        city: formData.from
      },
      arrival: {
        time: '19:10',
        city: formData.to
      },
      duration: '2h 25m',
      price: formData.transportType === 'flight' ? 7999 : 
             formData.transportType === 'train' ? 2499 : 1350,
      details: formData.transportType === 'flight' ? 'Direct, Entertainment' : 
               formData.transportType === 'train' ? 'Train No: 12259' : 'Mercedes Benz'
    }
  ];
  
  return (
    <div className="transport-results">
      <h3 className="results-title">
        {formData.transportType.charAt(0).toUpperCase() + formData.transportType.slice(1)}s from {formData.from} to {formData.to}
      </h3>
      
      <div className="results-list">
        {results.map((result) => (
          <div key={result.id} className="result-card">
            <div className="result-header">
              <div className="transport-name">{result.name}</div>
              <div className="transport-class">{result.class}</div>
            </div>
            
            <div className="transport-schedule">
              <div className="transport-time">
                <div className="time">{result.departure.time}</div>
                <div className="city">{result.departure.city}</div>
              </div>
              
              <div className="transport-duration">
                <div className="duration-line">
                  <div className="duration-dot"></div>
                  <div className="duration-dash"></div>
                  <div className="duration-dot"></div>
                </div>
                <div className="duration-text">
                  <Clock size={14} className="inline mr-1" />
                  {result.duration}
                </div>
              </div>
              
              <div className="transport-time">
                <div className="time">{result.arrival.time}</div>
                <div className="city">{result.arrival.city}</div>
              </div>
            </div>
            
            <div className="result-footer">
              <div>
                <div className="transport-price">₹{result.price}</div>
                <div className="transport-details text-sm text-gray-500">
                  <MapPin size={14} className="inline mr-1" />
                  {result.details}
                </div>
              </div>
              <Button 
                variant="default" 
                className="book-btn" 
                onClick={() => onBook(result.price, `${formData.transportType.charAt(0).toUpperCase() + formData.transportType.slice(1)} from ${formData.from} to ${formData.to} (${result.class})`)}
              >
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="transport-back-btn" 
        onClick={onBack}
      >
        Back to Search
      </Button>
    </div>
  );
};

export default TransportResults;
