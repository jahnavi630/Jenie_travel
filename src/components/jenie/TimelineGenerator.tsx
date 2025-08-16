
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TimelineDay {
  day: number;
  activities: string[];
}

const TimelineGenerator: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState<TimelineDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !days || !budget) return;

    setIsGenerating(true);

    // Mock API call - in a real app, you would call OpenAI API here
    setTimeout(() => {
      const generatedTimeline = generateMockTimeline(destination, parseInt(days), parseInt(budget));
      setTimeline(generatedTimeline);
      setIsGenerating(false);
    }, 1500);
  };

  const generateMockTimeline = (dest: string, numDays: number, budgetAmount: number): TimelineDay[] => {
    const mockTimeline: TimelineDay[] = [];
    const lowercaseDest = dest.toLowerCase();
    
    // Different activities based on destination
    let activities: string[] = [];
    
    if (lowercaseDest.includes('ooty')) {
      activities = [
        "Visit Botanical Gardens",
        "Boat ride at Ooty Lake",
        "Tea Factory tour",
        "Trek to Doddabetta Peak",
        "Train ride through Nilgiri Mountains",
        "Shopping at local markets",
        "Visit Rose Garden",
        "Dinner at Earl's Secret",
        "Explore Pykara Falls",
        "Safari at Mudumalai Wildlife Sanctuary"
      ];
    } else if (lowercaseDest.includes('jaipur')) {
      activities = [
        "Explore Amber Fort",
        "Visit City Palace",
        "Shop at Johari Bazaar",
        "See Hawa Mahal",
        "Tour Jantar Mantar",
        "Visit Jal Mahal",
        "Explore Nahargarh Fort",
        "Traditional Rajasthani dinner",
        "Elephant ride at Amer",
        "Visit Albert Hall Museum"
      ];
    } else if (lowercaseDest.includes('goa')) {
      activities = [
        "Relax at Calangute Beach",
        "Visit Aguada Fort",
        "Party at Anjuna Beach",
        "Water sports at Baga Beach",
        "Visit the Basilica of Bom Jesus",
        "Tour Old Goa churches",
        "Explore Dudhsagar Falls",
        "Cruise on Mandovi River",
        "Shopping at Anjuna Flea Market",
        "Seafood dinner at beach shack"
      ];
    } else {
      // Generic activities
      activities = [
        "Explore local attractions",
        "Visit historical sites",
        "Try local cuisine",
        "Shop at local markets",
        "Take a guided tour",
        "Relax at recommended spots",
        "Visit museums and galleries",
        "Experience local entertainment",
        "Take memorable photos",
        "Meet locals and learn about culture"
      ];
    }
    
    // Generate daily activities
    for (let i = 1; i <= numDays; i++) {
      const dayActivities: string[] = [];
      // 2-3 activities per day
      const activitiesPerDay = Math.floor(Math.random() * 2) + 2;
      
      for (let j = 0; j < activitiesPerDay; j++) {
        const randIndex = Math.floor(Math.random() * activities.length);
        const activity = activities[randIndex];
        
        if (!dayActivities.includes(activity)) {
          dayActivities.push(activity);
          // Remove used activity to avoid duplicates across days
          activities.splice(randIndex, 1);
          
          // If activities are exhausted, repopulate
          if (activities.length === 0) {
            if (lowercaseDest.includes('ooty')) {
              activities = ["Picnic at Emerald Lake", "Visit Avalanche Lake", "Stone House tour", "Shopping for chocolates", "Visit Thread Garden"];
            } else if (lowercaseDest.includes('jaipur')) {
              activities = ["Visit Birla Temple", "Explore Galtaji Temple", "Shopping for blue pottery", "Visit Jaigarh Fort", "Explore Sisodia Garden"];
            } else if (lowercaseDest.includes('goa')) {
              activities = ["Visit Chapora Fort", "Explore Arpora Night Market", "Visit butterfly beach", "Tour spice plantations", "Visit Shantadurga Temple"];
            } else {
              activities = ["Take a walking tour", "Try street food", "Visit viewpoints", "Experience local transport", "Attend cultural event"];
            }
          }
        } else {
          // If we randomly selected a duplicate, try again
          j--;
        }
      }
      
      mockTimeline.push({
        day: i,
        activities: dayActivities
      });
    }
    
    return mockTimeline;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination (e.g., Ooty, Jaipur)"
          className="mb-2"
        />
        <Input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Number of days"
          min="1"
          max="14"
          className="mb-2"
        />
        <Input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget (₹)"
          min="1000"
          className="mb-2"
        />
        <Button type="submit" disabled={isGenerating || !destination || !days || !budget}>
          {isGenerating ? 'Generating...' : 'Generate Timeline'}
        </Button>
      </form>

      {timeline.length > 0 && (
        <div className="tool-result mt-4">
          <h4 className="tool-heading">Your {days}-Day {destination} Itinerary:</h4>
          {timeline.map((day) => (
            <div key={day.day} className="mb-3">
              <p className="font-medium text-purple-700">Day {day.day}:</p>
              <ul className="ml-4 mt-1">
                {day.activities.map((activity, index) => (
                  <li key={index} className="text-sm mb-1">• {activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineGenerator;
