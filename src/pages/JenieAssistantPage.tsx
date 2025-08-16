
import React from 'react';
import JenieAssistant from '../components/jenie/JenieAssistant';
import BackButton from '../components/common/BackButton';
import './PageStyles.css';
import './PageBackground.css';

const JenieAssistantPage: React.FC = () => {
  return (
    <div className="page-background jenie-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          <h1 className="page-title">Jenie AI Mountain Travel Tools</h1>
          
          <section className="page-section">
            <p className="page-description">
              Explore our suite of AI-powered tools designed to enhance your mountain travel experience.
              From smart packing suggestions for high altitude to personalized hiking itineraries, Jenie has you covered.
            </p>
            
            <JenieAssistant />
          </section>
        </div>
      </div>
    </div>
  );
};

export default JenieAssistantPage;
