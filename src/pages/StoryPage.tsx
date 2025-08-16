
import React from 'react';
import StoryTeller from '../components/story/StoryTeller';
import './PageStyles.css';
import './PageBackground.css';

const StoryPage: React.FC = () => {
  return (
    <div className="page-background story-background">
      <div className="page-overlay">
        <div className="container page-content">
          <h1 className="page-title">Travel Stories</h1>
          
          <section className="page-section">
            <p className="page-description">
              Experience the magic of destinations through AI-generated travel stories. 
              Enter any location and let our AI craft a vivid narrative that brings the destination to life.
            </p>
            
            <StoryTeller />
          </section>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
