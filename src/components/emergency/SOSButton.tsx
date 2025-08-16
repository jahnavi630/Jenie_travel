
import React, { useState } from 'react';
import { AlertCircle, X, Phone, Shield, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import './SOSButton.css';

interface SOSButtonProps {
  className?: string;
}

const SOSButton: React.FC<SOSButtonProps> = ({ className = '' }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [calling, setCalling] = useState(false);
  
  const handleSOS = () => {
    setShowDialog(true);
  };
  
  const handleConfirm = () => {
    setCalling(true);
    // Simulate API call to emergency services
    setTimeout(() => {
      setCalling(false);
      // Show success message
      toast.success("Emergency services have been notified. Stay safe. An agent will contact you shortly.", {
        duration: 5000,
      });
      setShowDialog(false);
    }, 3000);
  };
  
  const handleCancel = () => {
    setShowDialog(false);
  };
  
  const buttonClassName = `sos-button pulse-animation ${className}`;
  
  return (
    <>
      <Button 
        className={buttonClassName}
        onClick={handleSOS}
        aria-label="Emergency SOS Button"
      >
        <AlertCircle className="sos-icon" />
        <span>SOS EMERGENCY</span>
      </Button>
      
      {showDialog && (
        <div className="sos-dialog-backdrop">
          <div className="sos-dialog">
            <button className="close-btn" onClick={handleCancel} aria-label="Close emergency dialog">
              <X size={20} />
            </button>
            <div className="dialog-content">
              <AlertCircle size={40} className="sos-dialog-icon" />
              <h3>Emergency Alert</h3>
              <p>This will notify local emergency services of your situation and location.</p>
              <p className="dialog-warning">Only use this in case of a real emergency.</p>
              
              <div className="sos-contact-list">
                <div className="sos-contact-item">
                  <div className="contact-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-details">
                    <span className="contact-type">Police</span>
                    <span className="contact-number">100</span>
                  </div>
                </div>
                
                <div className="sos-contact-item">
                  <div className="contact-icon">
                    <Shield size={18} />
                  </div>
                  <div className="contact-details">
                    <span className="contact-type">Ambulance</span>
                    <span className="contact-number">108</span>
                  </div>
                </div>
                
                <div className="sos-contact-item">
                  <div className="contact-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-details">
                    <span className="contact-type">Your Location</span>
                    <span className="contact-location">Will be shared with emergency services</span>
                  </div>
                </div>
              </div>
              
              <div className="dialog-actions">
                <Button variant="outline" onClick={handleCancel} disabled={calling} className="cancel-btn">
                  Cancel
                </Button>
                <Button 
                  className="confirm-btn" 
                  onClick={handleConfirm}
                  disabled={calling}
                >
                  {calling ? "Contacting Emergency Services..." : "Confirm Emergency"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;
