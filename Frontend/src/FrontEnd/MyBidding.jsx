import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from '@mui/material';
import config from '../config';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const BidHistoryPage = ({ }) => {
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/api/bidHistory/getBids`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // setBidHistory(data);
        setBuyerId(data);
        setProductId(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBidHistory();
  }, [buyerId, productId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error loading bid history: {error}</Typography>;
  }

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Sidebar />
      {bidHistory.length > 0 ? (
        bidHistory.map((bid) => (
          <Grid item xs={12} sm={6} md={4} key={bid.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Product: {bid.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Highest Bid: ${bid.highestAmount}
                </Typography>
                <Button variant="contained" color="primary">
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No bid history found.</Typography>
      )}
    </Grid>
  );
};

export default BidHistoryPage;
