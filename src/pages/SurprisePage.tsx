
import React from 'react';
import SurpriseDestination from '../components/surprise/SurpriseDestination';
import BackButton from '../components/common/BackButton';
import './PageStyles.css';
import './PageBackground.css';

const SurprisePage: React.FC = () => {
  return (
    <div className="page-background surprise-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          <h1 className="page-title">Surprise Destinations</h1>
          
          <section className="page-section">
            <p className="page-description">
              Can't decide where to go next? Let Jenie surprise you with exciting destination ideas.
              Click the button below to discover your next adventure!
            </p>
            
            <div className="white-background-card">
              <SurpriseDestination />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SurprisePage;
