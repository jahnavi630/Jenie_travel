
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmergencyCard from '../components/emergency/EmergencyCard';
import SafetyTips from '../components/emergency/SafetyTips';
import WeatherAlerts from '../components/emergency/WeatherAlerts';
import SOSButton from '../components/emergency/SOSButton';
import BackButton from '../components/common/BackButton';
import { getEmergencyInfo, EmergencyData } from '../services/emergencyService';
import { getSafetyTips } from '../services/safetyService';
import { getWeatherAlerts, WeatherAlert } from '../services/weatherService';
import { Info, MapPin, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import './PageStyles.css';
import './PageBackground.css';

const EmergencyPage: React.FC = () => {
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyData | null>(null);
  const [safetyTips, setSafetyTips] = useState<{ title: string; description: string }[]>([]);
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [destination, setDestination] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    // Get destination from URL query params or localStorage
    const queryParams = new URLSearchParams(location.search);
    let dest = queryParams.get('destination');
    
    if (!dest) {
      // Try to get from localStorage if not in URL
      const storedDetails = localStorage.getItem('travelDetails');
      if (storedDetails) {
        try {
          const parsedDetails = JSON.parse(storedDetails);
          dest = parsedDetails.destination;
        } catch (error) {
          console.error('Error parsing stored travel details:', error);
        }
      }
    }
    
    if (dest) {
      setDestination(dest);
      fetchEmergencyData(dest);
    } else {
      // Default destination if none is set
      setDestination('Delhi');
      fetchEmergencyData('Delhi');
      toast.info("No specific destination found. Showing emergency information for Delhi.");
    }
  }, [location.search]);

  const fetchEmergencyData = async (dest: string) => {
    setLoading(true);
    try {
      // Fetch emergency info based on destination
      const emergencyData = await getEmergencyInfo(dest);
      setEmergencyInfo(emergencyData);
      
      // Fetch safety tips
      const tips = await getSafetyTips(dest);
      setSafetyTips(tips);
      
      // Fetch weather alerts
      const alerts = await getWeatherAlerts(dest);
      setWeatherAlerts(alerts);
      
      toast.success(`Emergency information for ${dest} loaded successfully`);
    } catch (error) {
      console.error('Error fetching emergency data:', error);
      toast.error('Failed to load emergency information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderLoading = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading emergency information for {destination}...</p>
    </div>
  );

  return (
    <div className="page-background emergency-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          
          <div className="page-header">
            <h1 className="page-title">Emergency Information</h1>
            <p className="page-description">
              Critical contacts and safety information for your journey to {destination}
            </p>
          </div>
          
          {loading ? renderLoading() : (
            <div className="emergency-content">
              {/* Destination Alert */}
              <div className="info-alert">
                <div className="alert-icon">
                  <Info size={24} />
                </div>
                <div className="alert-content">
                  <h3 className="alert-title">Emergency Info for {destination}</h3>
                  <p className="alert-message">
                    Save these emergency contacts to your phone and keep this information handy during your stay.
                  </p>
                </div>
              </div>
              
              {/* SOS Button - Centralized with proper spacing */}
              <div className="sos-container">
                <SOSButton />
              </div>
              
              <div className="emergency-grid">
                {/* Emergency Contacts Box */}
                <div className="emergency-box contacts-box">
                  <div className="box-header">
                    <Shield size={20} className="box-icon" />
                    <h3 className="box-title">Emergency Contacts</h3>
                  </div>
                  {emergencyInfo && <EmergencyCard emergencyInfo={emergencyInfo} />}
                </div>
                
                {/* Weather Alerts Box */}
                <div className="emergency-box weather-box">
                  <div className="box-header">
                    <AlertTriangle size={20} className="box-icon" />
                    <h3 className="box-title">Weather Alerts</h3>
                  </div>
                  <WeatherAlerts alerts={weatherAlerts} destination={destination} />
                </div>
                
                {/* Safety Tips Box */}
                <div className="emergency-box safety-box">
                  <div className="box-header">
                    <MapPin size={20} className="box-icon" />
                    <h3 className="box-title">Local Safety Information</h3>
                  </div>
                  <SafetyTips tips={safetyTips} destination={destination} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
