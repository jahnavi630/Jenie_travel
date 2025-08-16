
import React, { useState } from 'react';
import './StoryTeller.css';

const StoryTeller: React.FC = () => {
  const [destination, setDestination] = useState<string>('');
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesisUtterance | null>(null);
  
  const generateStory = () => {
    if (!destination) {
      alert('Please enter a destination');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to OpenAI
    setTimeout(() => {
      const mockStories: Record<string, string> = {
        'paris': `Paris, the City of Light, welcomed me with open arms. As I strolled along the Seine River, the Eiffel Tower stood majestically in the distance. The aroma of freshly baked croissants filled the air, tempting me into a charming café. Locals and tourists alike savored the beauty of this timeless city. I spent hours in the Louvre, mesmerized by centuries of art. In the evening, Montmartre's bohemian spirit captivated my soul as street artists captured the essence of Paris on their canvases. With each cobblestone street I wandered and each historic landmark I discovered, I fell deeper in love with Paris, understanding why it has inspired poets, artists, and dreamers for generations.`,
        
        'bali': `Bali greeted me with its intoxicating blend of spiritual tranquility and natural beauty. I woke to the gentle sound of morning prayers echoing from distant temples. The lush rice terraces of Tegallalang seemed to cascade endlessly, creating a verdant masterpiece. My days were filled with explorations of ancient temples where incense smoke curled into the tropical air, carrying prayers heavenward. The locals welcomed me with genuine smiles and taught me about their rich cultural traditions. Evenings were spent on black sand beaches watching surfers dance with towering waves until the sun painted the sky in brilliant shades of orange and pink. Bali wasn't just a destination; it was a spiritual awakening, a place where my soul found peace amidst the chaos of everyday life.`,
        
        'new york': `New York City pulsed with electric energy from the moment I arrived. The towering skyscrapers created urban canyons that made me feel simultaneously small and invincible. Times Square dazzled with its neon brilliance, a testament to human creativity and ambition. I joined the diverse crowds navigating the busy streets, each person carrying their own New York dream. From the serene paths of Central Park to the artistic enclaves of Brooklyn, every neighborhood told a unique story. Street vendors offered culinary delights from around the world, turning a simple lunch into an international adventure. The city never truly slept, and neither did I, caught up in its infectious rhythm. New York wasn't just a city; it was a living, breathing entity that challenged me, inspired me, and ultimately changed me forever.`,
        
        'tokyo': `Tokyo enveloped me in its fascinating contradiction of ancient tradition and futuristic innovation. Neon lights illuminated skyscrapers that towered over centuries-old temples, creating a surreal landscape unlike anywhere else. In Harajuku, fashion defied convention as youth expressed themselves through vibrant, boundary-pushing styles. I found unexpected tranquility in a traditional tea garden, where time seemed to slow down amidst the city's constant movement. The subway system, a marvel of efficiency, whisked me between worlds – from the electronic paradise of Akihabara to the solemn beauty of Meiji Shrine. Each meal was an adventure, from meticulously crafted sushi to comforting ramen served in tiny, steamy shops. Tokyo didn't just captivate my senses; it expanded my understanding of how harmoniously the past and future can coexist.`
      };
      
      // Get the story based on destination or provide a generic one
      const normalizedDestination = destination.toLowerCase();
      let newStory = '';
      
      for (const key in mockStories) {
        if (normalizedDestination.includes(key)) {
          newStory = mockStories[key];
          break;
        }
      }
      
      if (!newStory) {
        newStory = `My journey to ${destination} was filled with unforgettable moments and breathtaking sights. The local culture welcomed me with open arms as I explored hidden gems and popular attractions alike. From the amazing food to the friendly locals, every aspect of this trip exceeded my expectations. The natural beauty of the landscape painted a perfect backdrop for adventures, while the bustling city life offered vibrant nightlife and cultural experiences. I returned home with a heart full of memories and a camera full of photos, already planning when I could return to experience more of what ${destination} has to offer.`;
      }
      
      setStory(newStory);
      setIsLoading(false);
    }, 2000);
  };
  
  const handlePlayPause = () => {
    if (!story) return;
    
    if (isPlaying) {
      // Pause speech
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Start speech
      const utterance = new SpeechSynthesisUtterance(story);
      utterance.rate = 0.9; // Slightly slower rate
      utterance.pitch = 1;
      utterance.onend = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
      setSpeechSynthesis(utterance);
      setIsPlaying(true);
    }
  };
  
  return (
    <div className="story-teller card">
      <h3 className="story-teller-title">AI Travel Story Generator</h3>
      
      <div className="story-input">
        <div className="form-group">
          <label htmlFor="destination">Enter a Destination</label>
          <div className="input-with-button">
            <input
              type="text"
              id="destination"
              className="form-control"
              placeholder="e.g., Paris, Tokyo, Bali"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={isLoading}
            />
            <button 
              className="btn btn-primary generate-btn"
              onClick={generateStory}
              disabled={isLoading || !destination}
            >
              {isLoading ? 'Generating...' : 'Generate Story'}
            </button>
          </div>
        </div>
      </div>
      
      {story && (
        <div className="story-result">
          <div className="story-content">
            <p>{story}</p>
          </div>
          
          <div className="story-actions">
            <button 
              className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} audio-btn`}
              onClick={handlePlayPause}
            >
              {isPlaying ? 'Pause' : 'Listen'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryTeller;
