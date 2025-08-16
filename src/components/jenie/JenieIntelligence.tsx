
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { MapPin, Calendar, Search, Package, Sun, ShieldAlert, Clock } from 'lucide-react';

interface IntelligenceFormData {
  destination: string;
  dates: string;
  travelers: string;
  tripType: string;
}

interface IntelligenceSummary {
  destination: string;
  weather: string;
  essentials: string[];
  safetyTips: string[];
  timeline: { day: string; activities: string[] }[];
  localTips: string[];
}

const mockResults = (data: IntelligenceFormData): IntelligenceSummary => {
  // Mock results based on destination
  const destination = data.destination.toLowerCase();
  
  if (destination.includes('mountain') || destination.includes('hill') || 
      destination.includes('himala') || destination.includes('alps')) {
    return {
      destination: data.destination,
      weather: "Mountain weather can change rapidly. Expect temperatures between 5°C to 20°C during day, dropping to -5°C at night. Afternoon thunderstorms are common.",
      essentials: [
        "Layered clothing including thermal base layers",
        "Waterproof hiking boots with ankle support",
        "Insulated jacket and rain shell",
        "Sun protection (high altitude increases UV exposure)",
        "First aid kit with altitude sickness medication",
        "Water purification tablets or filter",
        "Trekking poles for stability on rough terrain"
      ],
      safetyTips: [
        "Let someone know your hiking plans and expected return time",
        "Start descent before afternoon when storms typically form",
        "Stay hydrated and watch for signs of altitude sickness",
        "Check in with local ranger stations for current conditions",
        "Carry emergency beacon or satellite phone in remote areas"
      ],
      timeline: [
        {
          day: "Day 1",
          activities: [
            "Arrive and acclimate to altitude",
            "Short walk around base village/town",
            "Equipment check and rental if needed"
          ]
        },
        {
          day: "Day 2",
          activities: [
            "Begin with easier trails to adjust",
            "Visit local viewpoints",
            "Learn about local alpine ecology"
          ]
        },
        {
          day: "Day 3",
          activities: [
            "Full day moderate trek",
            "Packed lunch at scenic spot",
            "Evening relaxation with hot beverages"
          ]
        }
      ],
      localTips: [
        "Mountain communities often serve hearty local dishes - try the regional specialties",
        "Early mornings offer the clearest mountain views before clouds form",
        "Many mountain areas have cultural significance to local people - respect sacred sites",
        "Wildlife is most active at dawn and dusk"
      ]
    };
  } else if (destination.includes('beach') || destination.includes('coast') || 
             destination.includes('island') || destination.includes('sea')) {
    return {
      destination: data.destination,
      weather: "Warm and humid coastal climate expected with temperatures between 24°C to 32°C. Brief afternoon showers may occur with high UV index.",
      essentials: [
        "High SPF sunscreen (water resistant)",
        "Light, breathable clothing",
        "Swimwear and beach towel",
        "Water shoes for rocky beaches",
        "Insect repellent for evenings",
        "Dry bag for electronics",
        "Reusable water bottle"
      ],
      safetyTips: [
        "Check local beach flags and swimming advisories",
        "Learn about rip currents and how to escape them",
        "Stay hydrated and reapply sunscreen regularly",
        "Be aware of local marine life (jellyfish, sea urchins)",
        "Secure valuables when swimming"
      ],
      timeline: [
        {
          day: "Day 1",
          activities: [
            "Arrival and hotel check-in",
            "Beach orientation walk",
            "Sunset dinner by the water"
          ]
        },
        {
          day: "Day 2",
          activities: [
            "Morning swim or water activities",
            "Coastal exploration or boat tour",
            "Local seafood sampling"
          ]
        },
        {
          day: "Day 3",
          activities: [
            "Snorkeling or diving excursion",
            "Beach relaxation time",
            "Evening market or cultural show"
          ]
        }
      ],
      localTips: [
        "Fresh seafood is often best at small local restaurants away from tourist areas",
        "Many beaches are less crowded early morning or late afternoon",
        "Local fishermen can often recommend the best spots for sea viewing",
        "Coastal communities may have interesting crafts using materials from the sea"
      ]
    };
  } else {
    // Default/city destination
    return {
      destination: data.destination,
      weather: "Variable urban weather expected. Check the forecast closer to your travel dates for more specific information.",
      essentials: [
        "Comfortable walking shoes",
        "Versatile clothing for various settings",
        "Day bag for city exploration",
        "Power bank for devices",
        "City map or offline maps app",
        "Light rain jacket just in case",
        "Local currency in small denominations"
      ],
      safetyTips: [
        "Research safe and unsafe areas before arrival",
        "Keep valuables secure and be aware in crowded places",
        "Have a copy of important documents",
        "Know emergency numbers for your destination",
        "Use reputable transportation options"
      ],
      timeline: [
        {
          day: "Day 1",
          activities: [
            "Arrival and accommodation check-in",
            "Neighborhood orientation walk",
            "Visit a local restaurant for authentic cuisine"
          ]
        },
        {
          day: "Day 2",
          activities: [
            "Morning visit to main cultural attractions",
            "Lunch at market or food district",
            "Afternoon exploring shops or museums"
          ]
        },
        {
          day: "Day 3",
          activities: [
            "Day trip to nearby highlight",
            "Explore different neighborhood",
            "Evening entertainment or local experience"
          ]
        }
      ],
      localTips: [
        "Many museums have free or discounted days - check schedules in advance",
        "Local public transportation often offers day passes for tourists",
        "Street food is typically safe in busy areas with high turnover",
        "Ask hotel staff for current local recommendations and events"
      ]
    };
  }
};

const JenieIntelligence: React.FC = () => {
  const [formData, setFormData] = useState<IntelligenceFormData>({
    destination: '',
    dates: '',
    travelers: '2',
    tripType: 'adventure'
  });
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [summary, setSummary] = useState<IntelligenceSummary | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const generateIntelligence = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSummary(null);
    
    // Simulate API call with delay
    setTimeout(() => {
      const results = mockResults(formData);
      setSummary(results);
      setIsGenerating(false);
    }, 2000);
  };
  
  const filterSections = (section: string) => {
    setActiveSection(section);
  };
  
  return (
    <div className="intelligence-container">
      {!summary ? (
        <form onSubmit={generateIntelligence} className="intelligence-form">
          <div className="form-group">
            <label htmlFor="destination">
              <MapPin size={16} className="input-icon" />
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Swiss Alps, Himalayan Trek"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dates">
              <Calendar size={16} className="input-icon" />
              Travel Dates
            </label>
            <input
              type="text"
              id="dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              placeholder="e.g., June 15-25, 2025"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="travelers">
              <Search size={16} className="input-icon" />
              Number of Travelers
            </label>
            <select
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="form-select"
            >
              <option value="1">Solo Traveler</option>
              <option value="2">2 People</option>
              <option value="3-5">3-5 People</option>
              <option value="6+">6+ People</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="tripType">
              <Search size={16} className="input-icon" />
              Trip Type
            </label>
            <select
              id="tripType"
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="adventure">Adventure/Hiking</option>
              <option value="relaxation">Relaxation</option>
              <option value="cultural">Cultural Exploration</option>
              <option value="winter">Winter Sports</option>
              <option value="photography">Photography</option>
            </select>
          </div>
          
          <Button 
            type="submit" 
            className="generate-btn"
            disabled={isGenerating || !formData.destination}
          >
            {isGenerating ? (
              <>
                <div className="loading-spinner small"></div>
                <span>Generating your travel intelligence...</span>
              </>
            ) : (
              <>Generate Comprehensive Travel Plan</>
            )}
          </Button>
        </form>
      ) : (
        <div className="intelligence-results">
          <div className="results-header">
            <h3 className="results-title">
              Your Personalized Travel Intelligence for {summary.destination}
            </h3>
            <div className="results-nav">
              <button 
                className={`nav-btn ${activeSection === 'all' ? 'active' : ''}`} 
                onClick={() => filterSections('all')}
              >
                All
              </button>
              <button 
                className={`nav-btn ${activeSection === 'weather' ? 'active' : ''}`} 
                onClick={() => filterSections('weather')}
              >
                <Sun size={16} />
                Weather
              </button>
              <button 
                className={`nav-btn ${activeSection === 'packing' ? 'active' : ''}`} 
                onClick={() => filterSections('packing')}
              >
                <Package size={16} />
                Packing
              </button>
              <button 
                className={`nav-btn ${activeSection === 'safety' ? 'active' : ''}`} 
                onClick={() => filterSections('safety')}
              >
                <ShieldAlert size={16} />
                Safety
              </button>
              <button 
                className={`nav-btn ${activeSection === 'timeline' ? 'active' : ''}`} 
                onClick={() => filterSections('timeline')}
              >
                <Clock size={16} />
                Timeline
              </button>
            </div>
          </div>
          
          <div className="results-content">
            {(activeSection === 'all' || activeSection === 'weather') && (
              <div className="results-section weather-section">
                <h4 className="section-heading">
                  <Sun size={20} className="section-icon" />
                  Weather Advisor
                </h4>
                <p className="weather-forecast">{summary.weather}</p>
              </div>
            )}
            
            {(activeSection === 'all' || activeSection === 'packing') && (
              <div className="results-section packing-section">
                <h4 className="section-heading">
                  <Package size={20} className="section-icon" />
                  Packing Essentials
                </h4>
                <ul className="essentials-list">
                  {summary.essentials.map((item, index) => (
                    <li key={index} className="essential-item">
                      <span className="item-bullet"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {(activeSection === 'all' || activeSection === 'safety') && (
              <div className="results-section safety-section">
                <h4 className="section-heading">
                  <ShieldAlert size={20} className="section-icon" />
                  Safety & Health
                </h4>
                <ul className="safety-list">
                  {summary.safetyTips.map((tip, index) => (
                    <li key={index} className="safety-item">
                      <span className="item-number">{index + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {(activeSection === 'all' || activeSection === 'timeline') && (
              <div className="results-section timeline-section">
                <h4 className="section-heading">
                  <Clock size={20} className="section-icon" />
                  Suggested Timeline
                </h4>
                <div className="timeline-container">
                  {summary.timeline.map((day, index) => (
                    <div key={index} className="timeline-day">
                      <div className="day-marker">{day.day}</div>
                      <div className="day-activities">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="activity-item">
                            <span className="activity-dot"></span>
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(activeSection === 'all') && (
              <div className="results-section tips-section">
                <h4 className="section-heading">
                  <MapPin size={20} className="section-icon" />
                  Local Insights
                </h4>
                <div className="local-tips">
                  {summary.localTips.map((tip, index) => (
                    <div key={index} className="tip-card">
                      <span className="tip-number">{index + 1}</span>
                      <p className="tip-text">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="results-actions">
            <Button className="action-btn share-btn">
              Share This Plan
            </Button>
            <Button className="action-btn edit-btn" onClick={() => setSummary(null)}>
              Edit Preferences
            </Button>
            <Button className="action-btn save-btn">
              Save to My Trips
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JenieIntelligence;
