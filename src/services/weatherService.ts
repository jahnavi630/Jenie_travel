
export interface WeatherAlert {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

// Mock weather alerts database for different destinations
const weatherAlertsDatabase: { [key: string]: WeatherAlert[] } = {
  delhi: [
    {
      type: 'Heat Wave',
      severity: 'high',
      message: 'Extreme temperatures expected (40°C+). Stay hydrated and avoid outdoor activities between 11 AM and 4 PM.'
    },
    {
      type: 'Air Quality',
      severity: 'medium',
      message: 'Moderate air pollution levels. Consider wearing a mask if you have respiratory conditions.'
    }
  ],
  mumbai: [
    {
      type: 'Monsoon Showers',
      severity: 'medium',
      message: 'Heavy rainfall expected in the next 48 hours. Possible local flooding in low-lying areas.'
    },
    {
      type: 'Coastal Warning',
      severity: 'low',
      message: 'High tides expected. Avoid beach areas during evening high tide.'
    }
  ],
  goa: [
    {
      type: 'UV Index',
      severity: 'medium',
      message: 'Very high UV index (8-10). Use SPF 50+ sunscreen and limit sun exposure.'
    }
  ],
  manali: [
    {
      type: 'Snowfall',
      severity: 'medium',
      message: 'Light to moderate snowfall expected. Mountain passes may be temporarily closed.'
    },
    {
      type: 'Landslide Risk',
      severity: 'low',
      message: 'Recent rainfall has increased landslide risk in some mountain roads. Check local advisories before traveling.'
    }
  ],
  ladakh: [
    {
      type: 'Extreme Cold',
      severity: 'high',
      message: 'Temperatures expected to drop below -15°C at night. Ensure proper winter clothing and accommodation with heating.'
    },
    {
      type: 'Altitude Sickness',
      severity: 'medium',
      message: 'Risk of altitude sickness above 3,000m. Acclimatize properly and stay hydrated.'
    }
  ]
};

export const getWeatherAlerts = async (destination: string): Promise<WeatherAlert[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Normalize destination for lookup
  const normalizedDest = destination.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Check if we have specific alerts for this destination
  for (const key of Object.keys(weatherAlertsDatabase)) {
    if (normalizedDest.includes(key)) {
      return weatherAlertsDatabase[key];
    }
  }
  
  // Return empty array if no match (no alerts)
  return [];
};
