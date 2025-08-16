import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import SurpriseDestination from '../components/surprise/SurpriseDestination';
import TravelPlan from '../components/travel/TravelPlan';
import { toast } from 'sonner';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [budget, setBudget] = useState('');
  const [showPlan, setShowPlan] = useState(false);
  
  useEffect(() => {
    // Check if there are stored travel details
    const storedDetails = localStorage.getItem('travelDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      setShowPlan(true);
      // Populate the form with the stored details
      setStartingPoint(details.startingPoint);
      setDestination(details.destination);
      setBudget(details.budget);
    }
  }, []);
  
  const handleGeneratePlan = () => {
    if (!startingPoint || !destination) {
      toast.error("Please enter both starting point and destination");
      return;
    }
    
    // Save travel details to localStorage for the Bookings page
    const travelDetails = {
      startingPoint,
      destination,
      budget: budget || '1000',
      timestamp: new Date().toISOString() // Add timestamp for tracking the latest update
    };
    
    localStorage.setItem('travelDetails', JSON.stringify(travelDetails));
    console.log("Travel details saved:", travelDetails);
    
    toast.success(`Planning a trip from ${startingPoint} to ${destination} with a budget of $${budget || '1000'}`);
    setShowPlan(true);
  };
  
  return (
    <div className="home-page">
      <HeroSection 
        destination={destination}
        setDestination={setDestination}
        startingPoint={startingPoint}
        setStartingPoint={setStartingPoint}
        budget={budget}
        setBudget={setBudget}
        onGeneratePlan={handleGeneratePlan}
      />
      
      <div className="container home-sections">
        {showPlan && (
          <section className="home-section">
            <TravelPlan />
          </section>
        )}
        
        <section className="home-section">
          <h2 className="section-title">Need Inspiration?</h2>
          <SurpriseDestination />
        </section>
        
        <section className="home-section mountain-showcase">
          <h2 className="section-title">Discover Mountain Adventures</h2>
          <div className="mountain-grid">
            <div className="mountain-card">
              <img src="https://source.unsplash.com/random?mountain,alps" alt="Mountain landscape" />
              <div className="mountain-info">
                <h3>Alpine Heights</h3>
                <p>Experience the majesty of the highest peaks in Europe</p>
              </div>
            </div>
            <div className="mountain-card">
              <img src="https://source.unsplash.com/random?mountain,rockies" alt="Rocky mountains" />
              <div className="mountain-info">
                <h3>Rocky Wonders</h3>
                <p>Explore the rugged beauty of the Rocky Mountains</p>
              </div>
            </div>
            <div className="mountain-card">
              <img src="https://source.unsplash.com/random?mountain,andes" alt="Andes mountains" />
              <div className="mountain-info">
                <h3>Andean Trails</h3>
                <p>Trek through the iconic Andes mountain range</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
