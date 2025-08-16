
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const PackingAssistant: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [packingList, setPackingList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !date) return;

    setIsLoading(true);

    // Mock API call - in a real app, you would call an API with weather data etc.
    setTimeout(() => {
      const list = generatePackingList(destination, date);
      setPackingList(list);
      setIsLoading(false);
    }, 1000);
  };

  const generatePackingList = (dest: string, travelDate: string): string[] => {
    // Simple logic to generate mock packing suggestions based on destination and season
    const lowercaseDest = dest.toLowerCase();
    
    // Basic items for all destinations
    const basicItems = [
      "Passport/ID",
      "Phone charger",
      "Power bank",
      "Medication",
      "Toothbrush & toothpaste",
      "Hand sanitizer"
    ];
    
    // Destination specific items
    let specificItems: string[] = [];
    
    if (lowercaseDest.includes('beach') || lowercaseDest.includes('goa') || lowercaseDest.includes('kerala')) {
      specificItems = [
        "Swimwear",
        "Beach towel",
        "Sunscreen (SPF 50+)",
        "Sunglasses",
        "Flip-flops",
        "Light cotton clothes",
        "Hat or cap",
        "After-sun lotion"
      ];
    } else if (lowercaseDest.includes('hill') || lowercaseDest.includes('manali') || lowercaseDest.includes('shimla')) {
      specificItems = [
        "Thermal wear",
        "Jacket",
        "Woolen socks",
        "Winter cap",
        "Gloves",
        "Moisturizer",
        "Hiking shoes",
        "Lip balm"
      ];
    } else if (lowercaseDest.includes('city') || lowercaseDest.includes('delhi') || lowercaseDest.includes('mumbai')) {
      specificItems = [
        "Comfortable walking shoes",
        "Light jacket",
        "Umbrella/raincoat",
        "Day backpack",
        "Water bottle",
        "Cap or hat",
        "Casual and formal outfit"
      ];
    } else {
      // Default items for any other destination
      specificItems = [
        "Comfortable clothes",
        "Extra pair of shoes",
        "Light jacket",
        "Sunscreen",
        "Reusable water bottle"
      ];
    }
    
    // Season specific based on date
    const month = new Date(travelDate).getMonth() + 1; // 1-12
    let seasonalItems: string[] = [];
    
    if (month >= 6 && month <= 9) {
      // Summer-monsoon items
      seasonalItems = [
        "Umbrella",
        "Raincoat/poncho",
        "Waterproof bag",
        "Extra pair of shoes",
        "Insect repellent"
      ];
    } else if (month >= 11 || month <= 2) {
      // Winter items
      seasonalItems = [
        "Warm jacket",
        "Thermals",
        "Moisturizer",
        "Lip balm",
        "Warm socks"
      ];
    } else {
      // Spring/autumn items
      seasonalItems = [
        "Light sweater",
        "Mix of short and long sleeve clothes",
        "Light scarf",
        "Thin jacket"
      ];
    }
    
    // Combine and remove duplicates
    const combined = [...basicItems, ...specificItems, ...seasonalItems];
    return [...new Set(combined)];
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination (e.g., Goa, Manali)"
          className="mb-2"
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-2"
        />
        <Button type="submit" disabled={isLoading || !destination || !date}>
          {isLoading ? 'Generating...' : 'Get Packing List'}
        </Button>
      </form>

      {packingList.length > 0 && (
        <div className="tool-result mt-4">
          <h4 className="tool-heading">Packing List for {destination}:</h4>
          <ul className="tool-list">
            {packingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PackingAssistant;
