// src/components/DashboardStaff.js

import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import Header from "../../../components/Header";
import { styled } from '@mui/system';
import AuthService from '../../../Auth/AuthService';

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

const ProductDescription = styled(Typography)({
  color: '#666', // Gray color for description
  fontSize: '0.9rem',
  marginTop: '10px',
});

const DashboardStaff = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state


  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const result = await AuthService.getProducts();
      // setProducts(result);

      if (result.success) {
        setProducts(result.data);
        setError(null);
      } else {
        setError(result.message);
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An unexpected error occurred while fetching products.');
      setProducts([]);
    } finally {
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
        <Header />

        {/* Products Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4}>
            {products.length > 0 ? (
              products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <StyledCard>
                    {/* Display Product Image */}
                    {product.productImage ? (
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.productImage}
                        alt={product.productName}
                      />
                    ) : (
                      <CardMedia
                        component="div"
                        height="200"
                        sx={{ backgroundColor: '#ddd' }}
                      >
                        <Typography variant="subtitle1" align="center" sx={{ paddingTop: '90px' }}>
                          No Image Available
                        </Typography>
                      </CardMedia>
                    )}
                    
                    {/* Product Details */}
                    <CardContent>
                      <ProductName variant="h6">
                        {product.productName}
                      </ProductName>
                      <ProductPrice variant="body1">
                        ${product.productPrice.toFixed(2)}
                      </ProductPrice>
                      <ProductDescription variant="body2">
                        {product.productDescription}
                      </ProductDescription>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" style={{ width: '100%', marginTop: '20px' }}>
                No products available.
              </Typography>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DashboardStaff;
