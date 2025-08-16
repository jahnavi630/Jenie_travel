
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface FilterResults {
  accommodation: string[];
  activities: string[];
  transportOptions: string[];
  safetyTips: string[];
}

const TravelFilter: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [travelType, setTravelType] = useState<'family' | 'solo' | ''>('');
  const [filterResults, setFilterResults] = useState<FilterResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !travelType) return;

    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      const results = generateFilterResults(destination, travelType);
      setFilterResults(results);
      setIsLoading(false);
    }, 1000);
  };

  const generateFilterResults = (dest: string, type: 'family' | 'solo'): FilterResults => {
    const lowercaseDest = dest.toLowerCase();
    
    // Base results structure
    const results: FilterResults = {
      accommodation: [],
      activities: [],
      transportOptions: [],
      safetyTips: []
    };
    
    // Fill in based on travel type
    if (type === 'family') {
      // Family-specific suggestions
      results.accommodation = [
        "Family suites with connecting rooms",
        "Kid-friendly resorts with pools",
        "Vacation rentals with kitchen facilities",
        "Hotels offering childcare services"
      ];
      
      results.activities = [
        "Visit wildlife sanctuaries and zoos",
        "Try kid-friendly adventure sports",
        "Explore interactive museums",
        "Enjoy water parks and amusement parks",
        "Take guided tours suitable for all ages"
      ];
      
      results.transportOptions = [
        "Private car rental with child seats",
        "Day tour buses with family packages",
        "Train travel with reserved seating",
        "Rental services for baby strollers"
      ];
      
      results.safetyTips = [
        "Always keep kids' medications handy",
        "Pre-book child-friendly restaurants",
        "Identify kid-safe beaches and swimming zones",
        "Share your itinerary with family back home",
        "Carry ID cards for all family members"
      ];
      
      // Add location-specific family suggestions
      if (lowercaseDest.includes('goa')) {
        results.accommodation.push("Beach resorts with kids' clubs in North Goa");
        results.activities.push("Dolphin watching cruises", "Kid-friendly water sports at Baga");
        results.safetyTips.push("Look for 'family-friendly' sections of beaches");
      } else if (lowercaseDest.includes('ooty')) {
        results.accommodation.push("Cottages near Botanical Gardens");
        results.activities.push("Toy train ride", "Boating in Ooty Lake");
        results.transportOptions.push("Jeep rentals for Doddabetta viewpoint");
      } else if (lowercaseDest.includes('jaipur')) {
        results.accommodation.push("Heritage hotels with family rooms");
        results.activities.push("Elephant rides at Amber Fort", "Light and sound show at City Palace");
        results.safetyTips.push("Stay hydrated in the heat - especially children");
      }
      
    } else {
      // Solo-specific suggestions
      results.accommodation = [
        "Backpacker hostels with common areas",
        "Capsule hotels for budget stays",
        "Homestays to connect with locals",
        "Solo-friendly guesthouses with good reviews"
      ];
      
      results.activities = [
        "Join group treks and adventure activities",
        "Attend local cooking classes",
        "Explore off-beat destinations and hiking trails",
        "Take photography walks",
        "Try local experiences through Airbnb/local guides"
      ];
      
      results.transportOptions = [
        "Scooter/bike rentals for flexibility",
        "Public transport passes",
        "Shared taxi services",
        "Walking tours for urban exploration"
      ];
      
      results.safetyTips = [
        "Share live location with trusted contacts",
        "Join travelers' groups on social media",
        "Keep digital copies of important documents",
        "Research safe areas for solo travelers",
        "Register with your embassy for international travel"
      ];
      
      // Add location-specific solo suggestions
      if (lowercaseDest.includes('goa')) {
        results.accommodation.push("Hostels in Anjuna with traveler meetups");
        results.activities.push("Beach yoga classes", "Saturday night market");
        results.safetyTips.push("Be cautious at isolated beaches after dark");
      } else if (lowercaseDest.includes('rishikesh')) {
        results.accommodation.push("Ashrams offering single rooms");
        results.activities.push("Group rafting experiences", "Meditation classes");
        results.transportOptions.push("Shared jeeps to nearby treks");
      } else if (lowercaseDest.includes('delhi')) {
        results.accommodation.push("Hostels in safe areas like Connaught Place");
        results.activities.push("Street food tours", "Delhi by Cycle tour");
        results.safetyTips.push("Use trusted cab services at night");
      }
    }
    
    return results;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          className="mb-2"
        />
        
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Button 
            type="button"
            variant={travelType === 'family' ? 'default' : 'outline'}
            onClick={() => setTravelType('family')}
            className="flex items-center justify-center"
          >
            <span className="mr-1">👨‍👩‍👧</span> Family
          </Button>
          
          <Button 
            type="button"
            variant={travelType === 'solo' ? 'default' : 'outline'}
            onClick={() => setTravelType('solo')}
            className="flex items-center justify-center"
          >
            <span className="mr-1">🧳</span> Solo
          </Button>
        </div>
        
        <Button 
          type="submit"
          disabled={isLoading || !destination || !travelType}
          className="w-full"
        >
          {isLoading ? 'Filtering...' : 'Get Personalized Suggestions'}
        </Button>
      </form>

      {filterResults && (
        <div className="tool-result mt-4">
          <h4 className="tool-heading">Recommendations for {travelType === 'family' ? 'Family' : 'Solo'} Travel to {destination}:</h4>
          
          <div className="mt-3">
            <p className="font-medium text-purple-700">🏨 Accommodations:</p>
            <ul className="ml-4 mt-1">
              {filterResults.accommodation.map((item, index) => (
                <li key={index} className="text-sm mb-1">• {item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3">
            <p className="font-medium text-purple-700">🎯 Activities:</p>
            <ul className="ml-4 mt-1">
              {filterResults.activities.map((item, index) => (
                <li key={index} className="text-sm mb-1">• {item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3">
            <p className="font-medium text-purple-700">🚌 Transport Options:</p>
            <ul className="ml-4 mt-1">
              {filterResults.transportOptions.map((item, index) => (
                <li key={index} className="text-sm mb-1">• {item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-3">
            <p className="font-medium text-red-600">⚠️ Safety Tips:</p>
            <ul className="ml-4 mt-1">
              {filterResults.safetyTips.map((item, index) => (
                <li key={index} className="text-sm mb-1">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelFilter;
