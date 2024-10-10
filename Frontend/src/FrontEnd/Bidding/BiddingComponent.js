// src/Frontend/Bidding/BiddingComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const BiddingComponent = ({ productId, userId }) => {
    const [baseAmount, setBaseAmount] = useState('');

    const placeBid = async () => {
        try {
            const amount = parseFloat(baseAmount);
            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }
            await axios.post('/api/bids/place', { productId, userId, baseAmount: amount });
            alert('Bid placed successfully');
        } catch (error) {
            console.error("Error placing bid:", error);
            alert("Error placing bid.");
        }
    };

    return (
        <div>
            <h2>Place Your Bid</h2>
            <input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
                placeholder="Enter your bid amount"
            />
            <button onClick={placeBid}>Place Bid</button>
        </div>
    );
};

export default BiddingComponent;
