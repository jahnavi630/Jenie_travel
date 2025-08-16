
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const TravelChat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsLoading(true);

    // Mock API call - in a real app, you would call OpenAI API here
    setTimeout(() => {
      const mockResponse = generateMockResponse(query);
      setResponse(mockResponse);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (userQuery: string) => {
    // Simple mock response generator based on keywords
    if (userQuery.toLowerCase().includes('vizag') && userQuery.toLowerCase().includes('5000')) {
      return `🌊 3-Day Trip to Vizag under ₹5000:

Day 1: 
- Morning: RK Beach walk (Free)
- Afternoon: Submarine Museum (₹200)
- Evening: Kailasagiri Hill (₹150)

Day 2:
- Morning: Borra Caves excursion (₹800)
- Evening: Local seafood dinner (₹400)

Day 3:
- Morning: Yarada Beach (₹300 transport)
- Shopping at Lepakshi (₹500)

Accommodation: Budget hostel (₹800/night)
Food budget: ₹500/day
Transport: ₹1,200 total

Total estimated: ₹4,950`;
    } else if (userQuery.toLowerCase().includes('goa')) {
      return `🏖️ Goa Trip Plan:

Suggested beaches: Anjuna, Vagator, Arambol
Stay: Hostels in North Goa (₹800-1200/night)
Food: Beach shacks for seafood (₹400-600/meal)
Activities: 
- Scooter rental (₹300/day)
- Water sports (₹1000-1500) 
- Old Goa churches (Free)
- Night markets (shopping budget: ₹1000)

Local tip: Visit Fontainhas in Panjim for colorful Portuguese architecture!`;
    } else {
      return `Based on your request for "${userQuery}", here's a personalized plan:

1. Suggested accommodation: Budget hotels or hostels
2. Transportation: Local buses and shared taxis for cost-effectiveness
3. Food recommendations: Local eateries and street food for authentic experience
4. Activities: Mix of free attractions and paid experiences

Would you like more specific details? Please provide your budget range and preferred activities.`;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I want a 3-day trip to Vizag under ₹5000 with beaches."
          className="mb-2"
        />
        <Button type="submit" disabled={isLoading || !query}>
          {isLoading ? 'Thinking...' : 'Ask Jenie'}
        </Button>
      </form>

      {response && (
        <div className="tool-result mt-4">
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default TravelChat;
