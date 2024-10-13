import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Typography, Alert, TextField, Button } from '@mui/material';
import Header from "../../../components/Header";
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const ContentBox = styled(Box)({
  marginLeft: 240,
  padding: '20px',
});

const EditProduct = () => {
  const { productId } = "2"; // || useParams(); // Get the productId from the URL
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for the edit product form
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null); // Base64 string for the image
  const [productDescription, setProductDescription] = useState('');

  const [submitError, setSubmitError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProductDetails(response.data);
        setProductName(response.data.name);
        setProductPrice(response.data.startingBid);
        setProductDescription(response.data.description);
        setProductImage(response.data.imageBase64Strings); // Load the existing Base64 string if available
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Convert image file to Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result.split(',')[1]); // Extract Base64 part
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice) {
      setSubmitError('Please provide product name and price.');
      return;
    }

    const priceValue = parseFloat(productPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      setSubmitError('Please enter a valid positive number for the price.');
      return;
    }

    try {
      setSubmitLoading(true);
      setSubmitError(null);

      const success = await AuthService.updateProduct(productId, {
        name: productName,
        description: productDescription,
        startingBid: priceValue,
        sellerId: '12345', // Predefined sellerId for testing
        imageBase64Strings: productImage,
      });

      if (success) {
        navigate('/dashboard-staff');
      } else {
        setSubmitError('Failed to update product. Please try again.');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setSubmitError('An error occurred while updating the product.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box display="flex">
      <Box m="20px" flex="1">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
          <Header title="EDIT PRODUCT" subtitle="Please update product details here" />
        </Box>

        <Box
          component="form"
          onSubmit={handleUpdateProduct}
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
          <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
            Edit Product
          </Typography>
          {submitError && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{submitError}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bidding Price"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ step: '0.01' }}
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={submitLoading}>
                {submitLoading ? 'Updating...' : 'Update Product'}
              </Button>   
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProduct;
