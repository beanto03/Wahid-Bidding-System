import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AuthService from '../Auth/AuthService';

const BidHistoryPage = () => {
  const [buyerId, setBuyerId] = useState('someBuyerId');  // Set to the buyer's ID
  const [productId, setProductId] = useState('someProductId');  // Set to the product's ID
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const data = await AuthService.getBidHistory(buyerId, productId);  // Fetch bid history using AuthService
        setBidHistory(data);
      } catch (error) {
        console.error('Error fetching bid history:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (buyerId && productId) {
      fetchBidHistory();  // Only fetch when both buyerId and productId are available
    }
  }, [buyerId, productId]);  // Depend on buyerId and productId changes

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
                  Product: {bid.name}  {/* Replace with your actual field name */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Current Highest Bid: ${bid.highestAmount}  {/* Replace with your actual field name */}
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
