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

  //use axios
  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${config.backendUrl}/api/bidHistory/getBids`);
  
        // Handle the response
        if (response.status === 200) {
          const data = response.data;
          // Assuming data has buyerId and productId fields
          setBuyerId(data.buyerId);
          setProductId(data.productId);
        } else {
          throw new Error('Failed to fetch bid history');
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
          setError(`Error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Error request:', error.request);
          setError('No response received from server.');
        } else {
          // Something else happened
          console.error('Error message:', error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchBidHistory();
  }, []);


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
