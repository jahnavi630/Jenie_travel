
import React from 'react';
import BudgetPlanner from '../components/budget/BudgetPlanner';
import BackButton from '../components/common/BackButton';
import './PageStyles.css';
import './PageBackground.css';

const BudgetPage: React.FC = () => {
  return (
    <div className="page-background budget-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          <h1 className="page-title">Budget Planner</h1>
          
          <section className="page-section">
            <p className="page-description">
              Plan your travel budget wisely with our smart budget allocation tool. 
              Adjust the sliders to allocate your budget across different categories.
            </p>
            
            <BudgetPlanner />
          </section>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
