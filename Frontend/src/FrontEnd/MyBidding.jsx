// BidHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, CardMedia } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AuthService from '../Auth/AuthService';

const BidHistoryPage = () => {
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assuming you can get buyerId and productId from local storage or some other method
  const buyerId = localStorage.getItem('buyerId'); // Update this to your actual source
  const productId = "exampleProductId"; // Set the product ID based on your logic

  useEffect(() => {
    const fetchBidHistory = async () => {
      setLoading(true);
      try {
        const data = await AuthService.getBidHistory(buyerId, productId);
        setBidHistory(data);  // Update state with bid history data
      } catch (error) {
        console.error('Failed to fetch bid history:', error);
      } finally {
        setLoading(false);  // Set loading to false when data is fetched
      }
    };

    fetchBidHistory();
  }, [buyerId, productId]);  // Re-run the effect if buyerId or productId changes

  return (
    <>
    
    <Grid container spacing={2} backgroundColor="blue" sx={{ padding: 4 }}>
    <Sidebar/>
  {[...Array(3)].map((_, index) => (
    <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
      <Card sx={{
        backgroundColor: index % 2 === 0 ? '#FFECB3' : '#B3E5FC',
        borderRadius: '16px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          height="160"
          image={`https://via.placeholder.com/160?text=Product+${index + 1}`} // Dummy image
          alt={`Product ${index + 1}`}
          sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
        />

        {/* Product Details */}
        <CardContent>
          <Typography variant="h6" sx={{ color: '#37474F', fontWeight: 'bold' }}>
            Dummy Product {index + 1} // Product name
          </Typography>
          <Typography variant="body1" sx={{ color: '#1B5E20', marginTop: 1 }}>
            ${((index + 1) * 10).toFixed(2)} // Product price
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
</>
  );
};

export default BidHistoryPage;
