
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface WeatherAdvice {
  temperature: string;
  conditions: string;
  safetyTips: string[];
  travelTips: string[];
}

const WeatherAdvisor: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [weatherAdvice, setWeatherAdvice] = useState<WeatherAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;

    setIsLoading(true);

    // Mock API call - in a real app, you would call a weather API
    setTimeout(() => {
      const advice = generateMockWeatherAdvice(destination);
      setWeatherAdvice(advice);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockWeatherAdvice = (dest: string): WeatherAdvice => {
    const lowercaseDest = dest.toLowerCase();
    let advice: WeatherAdvice;
    
    // Current month for seasonal advice
    const currentMonth = new Date().getMonth(); // 0-11
    
    if (lowercaseDest.includes('manali') || lowercaseDest.includes('shimla') || lowercaseDest.includes('ladakh')) {
      // Hill stations
      if (currentMonth >= 10 || currentMonth <= 2) {
        // Winter
        advice = {
          temperature: `${Math.floor(Math.random() * 5) - 10}°C to ${Math.floor(Math.random() * 5)}°C`,
          conditions: "Heavy snowfall expected, limited visibility",
          safetyTips: [
            "Avoid Rohtang Pass due to dangerous conditions",
            "Carry emergency thermal blankets and heat packs",
            "Check road closures before traveling",
            "Ensure vehicle has snow chains"
          ],
          travelTips: [
            "Pack heavy thermals and insulated boots",
            "Book accommodations with reliable heating",
            "Carry hot water in a thermos flask",
            "Start journeys early as daylight is limited"
          ]
        };
      } else if (currentMonth >= 3 && currentMonth <= 5) {
        // Spring
        advice = {
          temperature: `${Math.floor(Math.random() * 10) + 5}°C to ${Math.floor(Math.random() * 10) + 15}°C`,
          conditions: "Pleasant days, cool nights, occasional rain",
          safetyTips: [
            "Watch for landslide warnings after rain",
            "Roads may be slippery in mornings due to frost",
            "Check weather before mountain activities",
            "High UV index - sunscreen essential"
          ],
          travelTips: [
            "Pack layers for temperature fluctuations",
            "Great time for trekking and outdoor activities",
            "Apple orchards begin blooming - good for photography",
            "Book jeep safaris in advance for mountain views"
          ]
        };
      } else {
        // Summer/Monsoon
        advice = {
          temperature: `${Math.floor(Math.random() * 10) + 15}°C to ${Math.floor(Math.random() * 10) + 25}°C`,
          conditions: "Moderate temperatures, afternoon rains possible",
          safetyTips: [
            "Be cautious of fast-moving streams during rain",
            "Stay indoors during thunderstorms",
            "Avoid narrow mountain roads during heavy rain",
            "Keep emergency contacts handy"
          ],
          travelTips: [
            "Carry light woolens and waterproof jacket",
            "Waterproof your backpack and electronics",
            "Carry insect repellent for outdoor activities",
            "Great time for river rafting in Beas (if it's Manali)"
          ]
        };
      }
    } else if (lowercaseDest.includes('goa') || lowercaseDest.includes('kerala') || lowercaseDest.includes('mumbai')) {
      // Coastal areas
      if (currentMonth >= 5 && currentMonth <= 9) {
        // Monsoon
        advice = {
          temperature: `${Math.floor(Math.random() * 5) + 24}°C to ${Math.floor(Math.random() * 5) + 30}°C`,
          conditions: "Heavy rainfall, high humidity, possible flooding",
          safetyTips: [
            "Avoid swimming in the sea - strong currents",
            "Stay away from beaches during high tide",
            "Check weather alerts before water activities",
            "Be cautious of flooded areas in cities"
          ],
          travelTips: [
            "Pack quick-dry clothes and waterproof footwear",
            "Carry strong umbrellas and raincoats",
            "Book accommodations away from flood-prone areas",
            "Great time for waterfall visits and photography"
          ]
        };
      } else if (currentMonth >= 10 && currentMonth <= 2) {
        // Winter/peak tourist season
        advice = {
          temperature: `${Math.floor(Math.random() * 5) + 20}°C to ${Math.floor(Math.random() * 5) + 32}°C`,
          conditions: "Sunny days, pleasant evenings, perfect beach weather",
          safetyTips: [
            "High UV index - use SPF 50+ sunscreen",
            "Stay hydrated in the coastal humidity",
            "Watch for jellyfish warnings at some beaches",
            "Secure valuables at crowded beaches"
          ],
          travelTips: [
            "Book accommodations in advance - peak season",
            "Great time for water sports and boat cruises",
            "Visit popular beaches early morning to avoid crowds",
            "Try the freshest seafood at beachside shacks"
          ]
        };
      } else {
        // Summer
        advice = {
          temperature: `${Math.floor(Math.random() * 5) + 30}°C to ${Math.floor(Math.random() * 5) + 35}°C`,
          conditions: "Very hot and humid days, warm nights",
          safetyTips: [
            "Risk of heat exhaustion - avoid midday sun",
            "Watch for dehydration symptoms",
            "High UV index - stay covered and use sunscreen",
            "Drink only bottled or purified water"
          ],
          travelTips: [
            "Plan indoor activities during 11am-4pm",
            "Book accommodations with reliable air conditioning",
            "Carry electrolyte supplements for hydration",
            "Off-season means better hotel rates and fewer crowds"
          ]
        };
      }
    } else {
      // Generic advice for other destinations
      if (currentMonth >= 3 && currentMonth <= 5) {
        // Summer
        advice = {
          temperature: `${Math.floor(Math.random() * 10) + 25}°C to ${Math.floor(Math.random() * 10) + 35}°C`,
          conditions: "Hot days, warm evenings, occasional dust storms",
          safetyTips: [
            "Stay hydrated with at least 3-4 liters of water daily",
            "Watch for signs of heat exhaustion",
            "Avoid outdoor activities between 12-4pm",
            "Keep emergency contacts saved offline"
          ],
          travelTips: [
            "Pack light, breathable cotton clothing",
            "Carry a reusable water bottle and electrolytes",
            "Book accommodations with air conditioning",
            "Plan early morning sightseeing when it's cooler"
          ]
        };
      } else if (currentMonth >= 6 && currentMonth <= 9) {
        // Monsoon
        advice = {
          temperature: `${Math.floor(Math.random() * 5) + 22}°C to ${Math.floor(Math.random() * 5) + 30}°C`,
          conditions: "Frequent rainfall, high humidity, possible urban flooding",
          safetyTips: [
            "Check weather forecasts before daily outings",
            "Avoid flooded areas and waterlogged streets",
            "Be cautious of slippery surfaces when walking",
            "Keep important documents in waterproof bags"
          ],
          travelTips: [
            "Pack quick-dry clothes and waterproof footwear",
            "Carry umbrellas and light raincoats",
            "Plan indoor backup activities",
            "Great time for budget travel - off-season rates"
          ]
        };
      } else {
        // Winter
        advice = {
          temperature: `${Math.floor(Math.random() * 10) + 10}°C to ${Math.floor(Math.random() * 10) + 25}°C`,
          conditions: "Pleasant days, cool nights, occasional morning fog",
          safetyTips: [
            "Be cautious of morning fog if driving",
            "Keep emergency contacts and location shared",
            "Watch for crowded tourist spots in peak season",
            "Stay updated on local travel advisories"
          ],
          travelTips: [
            "Pack layers for temperature fluctuations",
            "Ideal time for outdoor sightseeing and walking tours",
            "Book popular attractions in advance - peak tourist season",
            "Try seasonal winter specialties in local cuisine"
          ]
        };
      }
    }
    
    return advice;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination (e.g., Manali, Goa)"
          className="mb-2"
        />
        <Button type="submit" disabled={isLoading || !destination}>
          {isLoading ? 'Checking...' : 'Get Weather & Safety Tips'}
        </Button>
      </form>

      {weatherAdvice && (
        <div className="tool-result mt-4">
          <div className="mb-3">
            <h4 className="tool-heading">Current Weather in {destination}:</h4>
            <p><strong>Temperature:</strong> {weatherAdvice.temperature}</p>
            <p><strong>Conditions:</strong> {weatherAdvice.conditions}</p>
          </div>
          
          <div className="mb-3">
            <h4 className="tool-heading text-red-600">Safety Tips:</h4>
            <ul className="ml-4">
              {weatherAdvice.safetyTips.map((tip, index) => (
                <li key={index} className="text-sm mb-1">• {tip}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="tool-heading text-blue-600">Travel Tips:</h4>
            <ul className="ml-4">
              {weatherAdvice.travelTips.map((tip, index) => (
                <li key={index} className="text-sm mb-1">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAdvisor;
