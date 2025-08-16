
import React, { useState } from 'react';
import './PageStyles.css';
import './PageBackground.css';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setTimeout(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };
  
  return (
    <div className="page-background contact-background">
      <div className="page-overlay">
        <div className="container page-content">
          <h1 className="page-title">Contact Us</h1>
          
          <section className="page-section">
            <div className="contact-container">
              <div className="contact-info">
                <h2 className="section-subtitle">Get in Touch</h2>
                <p>Have questions or need assistance with your travel plans? We're here to help!</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <strong>Email:</strong>
                    <span>support@jenie-travel.com</span>
                  </div>
                  <div className="contact-item">
                    <strong>Phone:</strong>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="contact-item">
                    <strong>Hours:</strong>
                    <span>Monday to Friday, 9:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="contact-form-container">
                {submitted ? (
                  <div className="success-message">
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        className="form-control"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary submit-btn">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
