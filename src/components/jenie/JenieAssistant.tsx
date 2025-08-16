
import React, { useState } from 'react';
import TravelChat from './TravelChat';
import PackingAssistant from './PackingAssistant';
import EmergencyKitScanner from './EmergencyKitScanner';
import TimelineGenerator from './TimelineGenerator';
import WeatherAdvisor from './WeatherAdvisor';
import CalendarMock from './CalendarMock';
import TravelFilter from './TravelFilter';
import BudgetOptimizer from './BudgetOptimizer';
import TravelTrivia from './TravelTrivia';
import JenieIntelligence from './JenieIntelligence';
import { 
  MessageSquare, Package, AlertTriangle, Calendar, Cloud, 
  CalendarDays, Filter, DollarSign, Globe, Brain, ChevronDown, ChevronUp
} from 'lucide-react';
import './JenieAssistant.css';

interface ToolSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient: string;
}

const ToolSection: React.FC<ToolSectionProps> = ({ 
  title, description, icon, children, gradient 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`tool-section ${isExpanded ? 'expanded' : ''}`} style={{ 
      background: `linear-gradient(to right, ${gradient}, transparent 400px)` 
    }}>
      <div className="tool-section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="tool-icon">{icon}</div>
        <div className="tool-title-container">
          <h3 className="tool-title">{title}</h3>
          <p className="tool-description">{description}</p>
        </div>
        <button className="expand-btn" aria-label={isExpanded ? "Collapse section" : "Expand section"}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div className={`tool-content ${isExpanded ? 'visible' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const JenieAssistant: React.FC = () => {
  return (
    <div className="jenie-assistant-container">
      <div className="jenie-header">
        <h1 className="jenie-title">Jenie AI Travel Tools</h1>
        <p className="jenie-subtitle">
          Personalized AI-powered assistance for every aspect of your mountain journey
        </p>
      </div>

      <div className="tools-container">
        <ToolSection 
          title="💬 Travel Chat Assistant" 
          description="Get instant answers to all your travel queries"
          icon={<MessageSquare size={24} />}
          gradient="rgba(155, 135, 245, 0.1)"
        >
          <TravelChat />
        </ToolSection>

        <ToolSection 
          title="🧳 Smart Packing Assistant" 
          description="Never forget essential items with custom packing lists"
          icon={<Package size={24} />}
          gradient="rgba(126, 105, 171, 0.1)"
        >
          <PackingAssistant />
        </ToolSection>

        <ToolSection 
          title="🆘 Emergency Kit Scanner" 
          description="Ensure you're prepared for any situation"
          icon={<AlertTriangle size={24} />}
          gradient="rgba(239, 68, 68, 0.1)"
        >
          <EmergencyKitScanner />
        </ToolSection>

        <ToolSection 
          title="📅 Travel Timeline Generator" 
          description="Create optimized day-by-day itineraries"
          icon={<Calendar size={24} />}
          gradient="rgba(110, 89, 165, 0.1)"
        >
          <TimelineGenerator />
        </ToolSection>

        <ToolSection 
          title="☁️ Weather Advisor" 
          description="Get real-time weather updates for your destinations"
          icon={<Cloud size={24} />}
          gradient="rgba(51, 195, 240, 0.1)"
        >
          <WeatherAdvisor />
        </ToolSection>

        <ToolSection 
          title="📆 Calendar Integration" 
          description="Sync your travel plans with your personal calendar"
          icon={<CalendarDays size={24} />}
          gradient="rgba(139, 92, 246, 0.1)"
        >
          <CalendarMock />
        </ToolSection>

        <ToolSection 
          title="👨‍👩‍👧 Travel Filter" 
          description="Find activities perfect for solo travelers or families"
          icon={<Filter size={24} />}
          gradient="rgba(34, 197, 94, 0.1)"
        >
          <TravelFilter />
        </ToolSection>

        <ToolSection 
          title="💸 Budget Optimizer" 
          description="Maximize your travel experience while minimizing costs"
          icon={<DollarSign size={24} />}
          gradient="rgba(249, 115, 22, 0.1)"
        >
          <BudgetOptimizer />
        </ToolSection>

        <ToolSection 
          title="🎮 Travel Trivia" 
          description="Test your knowledge about world destinations"
          icon={<Globe size={24} />}
          gradient="rgba(251, 191, 36, 0.1)"
        >
          <TravelTrivia />
        </ToolSection>
      </div>

      <div className="jenie-intelligence-wrapper">
        <div className="intelligence-header">
          <div className="intelligence-icon-container">
            <Brain size={32} className="intelligence-icon" />
          </div>
          <div className="intelligence-title-container">
            <h2 className="intelligence-title">Jenie Intelligence</h2>
            <p className="intelligence-description">
              Our most advanced AI brings together insights from all tools to create your ultimate travel plan
            </p>
          </div>
        </div>
        <JenieIntelligence />
      </div>
    </div>
  );
};

export default JenieAssistant;
