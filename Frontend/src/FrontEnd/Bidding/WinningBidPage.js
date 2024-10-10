import React, { useState, useEffect } from 'react';  // Import useState and useEffect from React
import axios from 'axios';  // Import axios for making HTTP requests

const WinningBidPage = ({ productId }) => {
    const [winningBid, setWinningBid] = useState(null);

    useEffect(() => {
        const fetchWinningBid = async () => {
            try {
                const response = await axios.get(`/api/bids/highest/${productId}`);
                setWinningBid(response.data);
            } catch (error) {
                console.error("Error fetching winning bid:", error);
            }
        };

        fetchWinningBid();
    }, [productId]);

    return (
        <div>
            <h1>Winning Bid</h1>
            {winningBid ? (
                <div>
                    <h2>Product ID: {winningBid.productId}</h2>
                    <p>Winner User ID: {winningBid.userId}</p>
                    <p>Winning Amount: ${winningBid.bidAmount}</p>
                    <p>Bid Timestamp: {winningBid.timestamp}</p>
                </div>
            ) : (
                <p>No bids placed yet.</p>
            )}
        </div>
    );
};

export default WinningBidPage;
