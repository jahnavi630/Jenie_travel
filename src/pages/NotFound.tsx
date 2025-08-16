
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Oops! Looks like you've ventured off the map. This destination doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary not-found-btn">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
