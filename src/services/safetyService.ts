
interface SafetyTip {
  title: string;
  description: string;
}

// Mock safety tips database for different destinations
const safetyTipsDatabase: { [key: string]: SafetyTip[] } = {
  delhi: [
    {
      title: "Avoid isolated areas at night",
      description: "Delhi has some areas that are best avoided after dark. Stick to well-lit, populated areas, especially if you're unfamiliar with the city."
    },
    {
      title: "Use authorized transport",
      description: "Use official taxi services (Uber, Ola), prepaid taxi booths, or the Delhi Metro. Avoid unmarked taxis or accepting rides from strangers."
    },
    {
      title: "Beware of scams",
      description: "Be cautious of people claiming your hotel is closed or offering extremely cheap deals. Always verify information with your hotel directly."
    },
    {
      title: "Watch your belongings",
      description: "Keep valuables secure, especially in crowded markets like Chandni Chowk or tourist spots like India Gate. Use anti-theft bags when possible."
    },
    {
      title: "Drink bottled water",
      description: "Avoid tap water and ensure bottled water seals are intact before drinking. Be cautious with ice in drinks and street food that might be washed in tap water."
    }
  ],
  mumbai: [
    {
      title: "Be careful during monsoon season",
      description: "Mumbai experiences heavy rainfall from June to September. Check weather forecasts and avoid traveling during heavy rain as flooding is common."
    },
    {
      title: "Use licensed taxis and auto-rickshaws",
      description: "Insist on using the meter or agree on a fare before starting your journey. App-based services like Uber and Ola are widely available."
    },
    {
      title: "Stay vigilant in crowded areas",
      description: "Places like CST Station, Gateway of India, and local trains can be extremely crowded. Keep valuables secure and be aware of pickpockets."
    },
    {
      title: "Respect local customs at religious sites",
      description: "Remove shoes when entering temples and cover your head in certain religious places. Modest clothing is appreciated at all religious sites."
    },
    {
      title: "Be cautious near the beach",
      description: "Mumbai's beaches may have strong currents. Swimming is not recommended at many beaches, especially during monsoon season."
    }
  ],
  goa: [
    {
      title: "Water safety awareness",
      description: "Be cautious when swimming as some beaches have strong currents. Look for red flags that indicate dangerous swimming conditions and always swim in designated areas."
    },
    {
      title: "Avoid isolated beaches after dark",
      description: "Stick to popular beaches with adequate lighting and presence of other people after sunset."
    },
    {
      title: "Rent vehicles from reputable vendors",
      description: "If renting a scooter or bike, ensure you have the proper license, wear a helmet, and rent from established businesses. Check the vehicle condition before accepting."
    },
    {
      title: "Watch your drinks",
      description: "Never leave your drinks unattended at beach shacks or clubs. Be cautious about accepting drinks from strangers."
    },
    {
      title: "Use sunscreen and stay hydrated",
      description: "Goa's sun can be intense, especially between 10 AM and 4 PM. Use high SPF sunscreen, wear a hat, and drink plenty of water."
    }
  ],
  default: [
    {
      title: "Register with your embassy",
      description: "For international travel, consider registering your trip with your country's embassy or consulate for emergency assistance."
    },
    {
      title: "Keep digital copies of documents",
      description: "Store digital copies of your passport, visa, insurance details, and emergency contacts in the cloud and with trusted contacts."
    },
    {
      title: "Learn basic local phrases",
      description: "Knowing simple phrases like 'hello', 'thank you', and 'help' in the local language can be invaluable in emergency situations."
    },
    {
      title: "Have a basic first aid kit",
      description: "Carry essential medications, bandages, antiseptic wipes, and any personal prescriptions you might need."
    },
    {
      title: "Share your itinerary",
      description: "Let family or friends know your travel plans, accommodations, and check-in schedule so they can alert authorities if needed."
    }
  ]
};

export const getSafetyTips = async (destination: string): Promise<SafetyTip[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Normalize destination for lookup
  const normalizedDest = destination.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Check if we have specific data for this destination
  for (const key of Object.keys(safetyTipsDatabase)) {
    if (normalizedDest.includes(key)) {
      return safetyTipsDatabase[key];
    }
  }
  
  // Return default tips if no match
  return safetyTipsDatabase.default;
};
