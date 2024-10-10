// src/views/DashboardStaff/DashboardStaff.jsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import Header from "../../../components/Header";
import { styled } from '@mui/system';
import axios from 'axios'; // Make sure to install axios

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
}));

const ProductName = styled(Typography)({
  color: '#333', // Dark color for the product name
  fontSize: '1.2rem',
  fontWeight: '500',
  marginTop: '10px',
});

const ProductPrice = styled(Typography)({
  color: '#4caf50', // Green color for the price
  fontSize: '1rem',
  fontWeight: 'bold',
  marginTop: '5px',
});

const DashboardStaff = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Placeholder function to fetch products from backend
  const fetchProducts = async () => {
    try {
      // TODO: Replace the URL with your actual API endpoint
      const response = await axios.get('/api/products'); // Example endpoint
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box display="flex">

      {/* Main Content */}
      <Box m="20px" flex="1">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
          <Header title="DASHBOARD" subtitle="Welcome to Staff Bidding Website" />
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.productImage}
                    alt={product.productName}
                  />
                  <CardContent>
                    <ProductName variant="h6">
                      {product.productName}
                    </ProductName>
                    <ProductPrice variant="body1">
                      {product.productPrice}
                    </ProductPrice>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DashboardStaff;
