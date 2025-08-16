
import React from 'react';
import { Info, Shield } from 'lucide-react';
import './SafetyTips.css';

interface SafetyTip {
  title: string;
  description: string;
}

interface SafetyTipsProps {
  tips: SafetyTip[];
  destination: string;
}

const SafetyTips: React.FC<SafetyTipsProps> = ({ tips, destination }) => {
  return (
    <div className="safety-tips">
      <h4 className="tips-title">
        <Shield size={18} className="tips-title-icon" />
        Safety Tips for {destination}
      </h4>
      <div className="tips-list">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <div className="tip-icon">
              <Info size={18} />
            </div>
            <div className="tip-content">
              <h5 className="tip-title">{tip.title}</h5>
              <p className="tip-description">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyTips;
