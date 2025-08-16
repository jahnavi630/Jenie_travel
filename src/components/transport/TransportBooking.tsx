
import React, { useState } from 'react';
import './TransportBooking.css';
import TransportResults from './TransportResults';
import { Button } from '../ui/button';

// Declare the Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

const TransportBooking: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    transportType: 'flight'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  // Razorpay integration
  const handleRazorpay = (amount: number, description: string) => {
    const options = {
      key: "rzp_test_YourTestKey", // Replace with your test key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Jenie Travel",
      description: description,
      image: "https://source.unsplash.com/100x100/?travel,logo",
      handler: function (response: any) {
        alert("Booking successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Traveler",
        email: "traveler@example.com",
        contact: "9876543210"
      },
      theme: {
        color: "#6366F1"
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      alert("Payment could not be initialized. Please try again.");
    }
  };

  return (
    <div className="card transport-booking">
      {!showResults ? (
        <>
          <h3 className="transport-booking-title">Find Your Travel Transport</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="transportType">Transport Type</label>
                <select 
                  id="transportType" 
                  name="transportType" 
                  className="form-control"
                  value={formData.transportType}
                  onChange={handleChange}
                  required
                >
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="from">From</label>
                <input 
                  type="text" 
                  id="from" 
                  name="from" 
                  className="form-control" 
                  placeholder="City of departure"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input 
                  type="text" 
                  id="to" 
                  name="to" 
                  className="form-control" 
                  placeholder="Destination city"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departDate">Depart Date</label>
                <input 
                  type="date" 
                  id="departDate" 
                  name="departDate" 
                  className="form-control"
                  value={formData.departDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="returnDate">Return Date (Optional)</label>
                <input 
                  type="date" 
                  id="returnDate" 
                  name="returnDate" 
                  className="form-control"
                  value={formData.returnDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="passengers">Number of Passengers</label>
              <input 
                type="number" 
                id="passengers" 
                name="passengers" 
                className="form-control" 
                min="1" 
                max="9"
                value={formData.passengers}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="btn btn-primary transport-search-btn"
            >
              Search
            </Button>
          </form>
        </>
      ) : (
        <>
          <TransportResults 
            formData={formData} 
            onBack={handleBack} 
            onBook={handleRazorpay}
          />
        </>
      )}
    </div>
  );
};

export default TransportBooking;
