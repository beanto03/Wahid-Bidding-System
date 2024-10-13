import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Typography, Alert, TextField, Button } from '@mui/material';
import Header from "../../../components/Header";
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../Auth/AuthService';

//name 
//description
//startingBid
//imageBase64

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

const ContentBox = styled(Box)( {
  marginLeft: 240, // Add margin to the right of the drawer
  padding: '20px',
});

const DashboardStaff = () => {
  // State for products, loading, and error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for the new product form
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductDescription, setNewProductDescription] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();

  // // Fetch products from API on component mount
 

  // Handle form submission to add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newProductName || !newProductPrice || !newProductImage) {
      setSubmitError('Please provide product name, price, and image.');
      return;
    }
  
    // Validate that price is a positive number
    const priceValue = parseFloat(newProductPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      setSubmitError('Please enter a valid positive number for the price.');
      return;
    }
  
    try {
      setSubmitLoading(true);
      setSubmitError(null);
  
      // Send the product details along with the image file
      const success = await AuthService.addProduct({
        name: newProductName,
        description: newProductDescription,
        startingBid: priceValue,
        sellerId: '12345', // Predefined sellerId for testing
        imageBase64Strings: newProductImage, // Pass the image directly
      });
  
      if (success) {
        // Optionally, you can refresh the product list or navigate
        setProducts([...products, success]);
        navigate('/dashboard-staff'); // Ensure this route exists
      } else {
        setSubmitError('Failed to add product. Please try again.');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setSubmitError('An error occurred while adding the product.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box display="flex">
      {/* Main Content */}
      <Box m="20px" flex="1">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
          <Header title="ADD PRODUCT" subtitle="Please insert product details here" />
        </Box>

        {/* Add Product Form */}
        <Box
          component="form"
          onSubmit={handleAddProduct}
          sx={{
            mb: 4,
            p: 3,
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
          >
            Add New Product
          </Typography>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {submitError}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bidding Price"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ step: '0.01' }}
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={(e) => setNewProductImage(e.target.files[0])}
                accept="image/*"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitLoading}
              >
                {submitLoading ? 'Adding...' : 'Add Product'}
              </Button>   
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardStaff;
