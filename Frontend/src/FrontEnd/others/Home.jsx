import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled Gradient Button using MUI's styled API
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  },
}));

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState({}); // State to track bids for each product

  // Predefined buyerId for testing
  const buyerId = "12345";

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/all'); // Updated API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBidChange = (productId, value) => {
    // Update the bids state when the user types a bid amount
    setBids((prevBids) => ({
      ...prevBids,
      [productId]: value,
    }));
  };

  const handleBidSubmit = async (product) => {
    const bidAmount = bids[product.id]; // Ensure you use the correct property to identify the product
  
    if (!bidAmount || bidAmount <= product.currentBid) {
      alert('Please enter a valid bid amount higher than the current bid.');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:8080/api/bid/placeBid`, {
        productId: product.id,
        buyerId: buyerId, // Predefined buyerId included here
        bidAmount: bidAmount,
      });
  
      // Handle success response
      console.log('Bid placed successfully:', response.data);
      alert('Your bid has been placed!');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing your bid. Please try again.');
    }
  };
  
  if (loading) {
    return <Typography variant="h6">Loading products...</Typography>;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          boxSizing: 'border-box',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: 'purple',
              textAlign: 'center',
              fontStyle: 'italic',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Bidding System
          </Typography>
  
          <Grid container spacing={4} justifyContent="left" sx={{ width: '100%', maxWidth: '1200px' }}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: '0 auto',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${product.imageBase64Strings[0]}`}
                    alt={product.name}
                    sx={{
                      borderTopLeftRadius: '4px',
                      borderTopRightRadius: '4px',
                      cursor: 'pointer',
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body1">
                      Current Bid: ${product.currentBid.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Time Left: {/* Implement time left logic here */}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', padding: 2 }}>
                    <TextField
                      type="number"
                      placeholder="Enter your bid"
                      fullWidth
                      variant="outlined"
                      size="small"
                      onChange={(e) => handleBidChange(product.id, e.target.value)}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#fff' },
                          '&:hover fieldset': { borderColor: '#c2e9fb' },
                          '&.Mui-focused fieldset': { borderColor: '#a1c4fd' },
                        },
                        input: { color: '#fff' },
                        '& .MuiInputLabel-root': { color: '#fff' },
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                      }}
                    />
                    <GradientButton onClick={() => handleBidSubmit(product)} fullWidth>
                      Place Bid
                    </GradientButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
  
};

export default Home;
