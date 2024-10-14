// src/components/DashboardStaff.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import Header from "../../../components/Header";
import AuthService from '../../../Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import { Fumo } from '../../../assets/images';

const DashboardStaff = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state


  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const result = await AuthService.getProducts();

      if (result) {
        setProducts(result);
        setError(null);
      } else if (result && result.message) {
        setError(result.message);
        setProducts([]);
      } else {
        setError('Failed to fetch products.');
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
    // Check if the user is authenticated
    fetchProducts();
  }, [useNavigate]);

  return (
     
    <Grid container spacing={2} sx={{ padding: 4 }}>
    {loading ? (
      <Typography variant="h6" sx={{ color: '#37474F' }}>Loading...</Typography>
    ) : error ? (
      <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
    ) : (
      products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.id}> {/* Assuming product has an 'id' */}
          <Card sx={{
            backgroundColor: '#FFECB3',
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
              image={'data:image/png;base64,${product.imageBase64Strings}'} // Use the product's image URL
              alt={product.name}
              sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
            />
            {/* Product Details */}
            <CardContent>
              <Typography variant="h6" sx={{ color: '#37474F', fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#1B5E20', marginTop: 1 }}>
                ${product.startingBid} {/* Assuming product has a 'price' */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))
    )}
  </Grid>
   
  );
};

export default DashboardStaff;