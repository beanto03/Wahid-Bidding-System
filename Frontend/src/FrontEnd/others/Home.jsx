import React, { useState } from 'react';
import { carbidding, housebidding } from "../../assets/images";

const Home = () => {
  // Set initial bids
  const [carBid, setCarBid] = useState(1000); // Starting bid for car
  const [houseBid, setHouseBid] = useState(5000); // Starting bid for house

  // Handle bid input
  const [carBidInput, setCarBidInput] = useState('');
  const [houseBidInput, setHouseBidInput] = useState('');

  // Function to handle placing a bid on the car
  const handleCarBid = (e) => {
    e.preventDefault();
    const newBid = parseFloat(carBidInput);
    if (newBid > carBid) {
      setCarBid(newBid);
      setCarBidInput('');
    } else {
      alert('Your bid must be higher than the current bid.');
    }
  };

  // Function to handle placing a bid on the house
  const handleHouseBid = (e) => {
    e.preventDefault();
    const newBid = parseFloat(houseBidInput);
    if (newBid > houseBid) {
      setHouseBid(newBid);
      setHouseBidInput('');
    } else {
      alert('Your bid must be higher than the current bid.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#f9f9f9', minHeight: '100vh', color: '#333' }}>
      <h1 style={{ fontSize: '48px', color: 'purple', textAlign: 'center', fontStyle: 'italic' }}>
        This is the bidding website
        </h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginBottom: '20px' }}>
        <div style={{ width: '45%', textAlign: 'center' }}>
          <img
            src={carbidding}
            alt="Car Bidding"
            style={{ width: '60%', borderRadius: '10px', marginBottom: '10px' }}
          />
          <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>Car Bidding</h2>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>Current Bid: ${carBid}</p>
          <form onSubmit={handleCarBid}>
            <input
              type="number"
              value={carBidInput}
              onChange={(e) => setCarBidInput(e.target.value)}
              placeholder="Enter your bid"
              style={{ padding: '10px', fontSize: '16px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'purple', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Place Bid
            </button>
          </form>
        </div>
        
        <div style={{ width: '45%', textAlign: 'center' }}>
          <img
            src={housebidding}
            alt="House Bidding"
            style={{ width: '60%', borderRadius: '10px', marginBottom: '10px' }}
          />
          <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>House Bidding</h2>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>Current Bid: ${houseBid}</p>
          <form onSubmit={handleHouseBid}>
            <input
              type="number"
              value={houseBidInput}
              onChange={(e) => setHouseBidInput(e.target.value)}
              placeholder="Enter your bid"
              style={{ padding: '10px', fontSize: '16px', width: '80%', marginBottom: '10px' }}
            />
            <br />
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'purple', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Place Bid
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default Home;
