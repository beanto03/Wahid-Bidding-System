import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Container } from '@mui/material';
import config from '../config';
import Sidebar from '../components/Sidebar';

const BidHistoryPage = ({ productId, buyerId }) => {
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/api/bidHistory/getBids/${buyerId}/${productId}`);
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          console.error('Fetch error:', errorMessage);
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setBidHistory(data);
      } catch (error) {
        console.error('Error fetching bid history:', error);
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
    <Container>
      <Sidebar />
      <Grid container spacing={3} style={{ padding: '20px' }}>
        {bidHistory.length > 0 ? (
          bidHistory.map((bid) => (
            <Grid item xs={12} sm={6} md={4} key={bid.historyId}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Product ID: {bid.productId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Buyer ID: {bid.buyerId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Highest Amount: ${bid.highestAmount}
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
    </Container>
  );
};

export default BidHistoryPage;
