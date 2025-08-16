
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/common.css';

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to = '/', label = 'Back' }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
  };
  
  return (
    <button className="back-button" onClick={handleClick} aria-label={label}>
      <ArrowLeft size={24} />
      <span className="back-button-text">{label}</span>
    </button>
  );
};

export default BackButton;
