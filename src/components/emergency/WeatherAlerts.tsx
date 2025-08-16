
import React from 'react';
import { Cloud, CloudLightning, CloudRain, CloudSnow, Thermometer } from 'lucide-react';
import './WeatherAlerts.css';

interface WeatherAlert {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
  destination: string;
}

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts, destination }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="weather-alerts no-alerts">
        <h4 className="alerts-title">Weather Alerts</h4>
        <div className="no-alerts-message">
          <Cloud size={24} />
          <p>No current weather alerts for {destination}</p>
        </div>
      </div>
    );
  }

  const getAlertIcon = (type: string) => {
    type = type.toLowerCase();
    if (type.includes('rain') || type.includes('monsoon')) {
      return <CloudRain size={20} />;
    } else if (type.includes('snow') || type.includes('winter')) {
      return <CloudSnow size={20} />;
    } else if (type.includes('storm') || type.includes('thunder')) {
      return <CloudLightning size={20} />;
    } else if (type.includes('heat') || type.includes('temperature')) {
      return <Thermometer size={20} />;
    } else {
      return <Cloud size={20} />;
    }
  };

  return (
    <div className="weather-alerts">
      <h4 className="alerts-title">Weather Alerts for {destination}</h4>
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert-item severity-${alert.severity}`}>
            <div className="alert-icon">
              {getAlertIcon(alert.type)}
            </div>
            <div className="alert-content">
              <div className="alert-type">{alert.type}</div>
              <div className="alert-message">{alert.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts;
