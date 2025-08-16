
import React from 'react';
import { Button } from '../ui/button';
import { Phone, MapPin, Download, Building, Ambulance, Shield, PhoneCall } from 'lucide-react';
import './EmergencyCard.css';
import { EmergencyData } from '../../services/emergencyService';

interface EmergencyCardProps {
  emergencyInfo: EmergencyData;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ emergencyInfo }) => {
  const downloadEmergencyCard = () => {
    // In a real implementation, this would use html2pdf.js
    alert('Emergency card downloaded!');
  };
  
  return (
    <div className="emergency-section fade-in">
      <h3 className="emergency-title">Emergency Contact Information</h3>
      
      <div className="emergency-content">
        <div className="emergency-category">
          <h4 className="category-label">
            <Shield size={18} className="category-icon" />
            Emergency Numbers
          </h4>
          <div className="emergency-numbers">
            <div className="emergency-item">
              <span className="item-label">Police (General):</span>
              <span className="item-value">
                <PhoneCall size={14} className="inline-icon" />
                {emergencyInfo.police.general}
              </span>
            </div>
            <div className="emergency-item">
              <span className="item-label">Tourist Police:</span>
              <span className="item-value">
                <PhoneCall size={14} className="inline-icon" />
                {emergencyInfo.police.tourist}
              </span>
            </div>
            <div className="emergency-item">
              <span className="item-label">Ambulance:</span>
              <span className="item-value">
                <Ambulance size={14} className="inline-icon" />
                {emergencyInfo.ambulance}
              </span>
            </div>
            {emergencyInfo.fireservice && (
              <div className="emergency-item">
                <span className="item-label">Fire Service:</span>
                <span className="item-value">
                  <PhoneCall size={14} className="inline-icon" />
                  {emergencyInfo.fireservice}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="emergency-category">
          <h4 className="category-label">
            <Building size={18} className="category-icon" />
            Embassy Contacts
          </h4>
          <div className="embassy-contacts">
            {Object.entries(emergencyInfo.embassies).map(([country, phone], index) => (
              <div key={index} className="emergency-item">
                <span className="item-label">
                  {country === 'us' ? 'US' : 
                   country === 'uk' ? 'UK' : 
                   country.charAt(0).toUpperCase() + country.slice(1)} Embassy:
                </span>
                <span className="item-value">
                  <Phone size={14} className="inline-icon" />
                  {phone}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="emergency-category hospitals-category">
          <h4 className="category-label">
            <Ambulance size={18} className="category-icon" />
            Hospitals
          </h4>
          <div className="hospitals-list">
            {emergencyInfo.hospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h5 className="hospital-name">{hospital.name}</h5>
                {hospital.specialty && (
                  <div className="hospital-specialty">{hospital.specialty}</div>
                )}
                <p className="hospital-phone">
                  <Phone size={14} className="icon" />
                  {hospital.phone}
                </p>
                <p className="hospital-address">
                  <MapPin size={14} className="icon" />
                  {hospital.address}
                </p>
                {hospital.distance && (
                  <div className="hospital-distance">
                    <span className="distance-label">Distance:</span> {hospital.distance}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Button 
        className="download-btn"
        onClick={downloadEmergencyCard}
      >
        <Download size={16} className="mr-2" />
        <span>Download Emergency Card</span>
      </Button>
    </div>
  );
};

export default EmergencyCard;
