import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to import the CSS file

const App = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/api/subscribe', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to subscribe. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">SIGN UP FOR OUR DAILY INSIDER</label>
        <input
          type="email"
          className="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
