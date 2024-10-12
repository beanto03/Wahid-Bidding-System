import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { Typography, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';

import Sidebar from '../components/Sidebar';
import axios from 'axios';

  //design theme
const StyledCard = styled(Card)({
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  });

  const Font = styled(Typography)({
    color: '#0ec96c',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginLeft: '15px'
  });
  const PriceTag = styled(Typography)({
    color: '#4caf50', // Green color for the price
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '10px',
  });
  
  const ContentBox = styled(Box)({
    marginLeft: 240, // Add margin to the right of the drawer
    padding: '20px',
  });
  
  
  function MyBidding() {
    const [biddingData, setBiddingData] = useState([]);
  
    useEffect(() => {
      // Replace the URL with your API endpoint
      axios
        .get('http://api.example.com/biddings') // Placeholder URL
        .then((response) => {
          // Update the state with the fetched data     
          setBiddingData(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the bidding data!', error);
        });
    }, []);

    return (
        <>
          {/* Sidebar Header */}
           <Sidebar />
          {/* Main Content */}
    
          <ContentBox
            sx={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              boxSizing: 'border-box',
            }}>

            <Grid container spacing={4}>
              {biddingData.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.productImage}
                      alt="Product Image"
                    />
                    <CardContent>
                      <Font>
                        {item.userID}
                      </Font>
                      <PriceTag>
                        {item.productPrice}
                      </PriceTag>
                     
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
      </ContentBox>
    </>
  );
}

export default MyBidding;
