import React, { useState, useEffect } from 'react';
import { Drawer, Toolbar, Typography, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';
import { styled } from '@mui/system';
import Sidebar from "../components/Sidebar"

// Mock Data
const mockData = [
  {
    id: 1,
    productImage: "https://static.zerochan.net/Takamachi.Nanoha.full.3408942.jpg",
    productPrice: "$100",
    timeLeft: "2h 30m",
  },
  {
    id: 2,
    productImage: "https://static.zerochan.net/Takamachi.Nanoha.full.3336740.jpg",
    productPrice: "$120",
    timeLeft: "1h 45m",
  },
  {
    id: 3,
    productImage: "https://static.zerochan.net/Fate.Testarossa.full.2429047.jpg",
    productPrice: "$150",
    timeLeft: "3h 10m",
  },
];

// Styled Components

const StyledCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const PriceTag = styled(Typography)({
  color: '#4caf50', // Green color for the price
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginTop: '10px',
});

const TimeLeftTag = styled(Typography)({
  color: '#f44336', // Red color for time left
  fontSize: '1rem',
  fontWeight: '600',
});

const ContentBox = styled(Box)({
  marginLeft: 240, // Add margin to the right of the drawer
  padding: '20px',
});

function CustomerBiddingDashboard() {
  const [biddingData, setBiddingData] = useState([]);

  useEffect(() => {
    // You can replace this mock data with real data from an API.
    setBiddingData(mockData);
  }, []);

  return (
    <>  
     
      {/* Sidebar Header */}
       <Sidebar />
      
      {/* Main Content */}
      <ContentBox>
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
                  <PriceTag>
                    {item.productPrice}
                  </PriceTag>
                  <TimeLeftTag>
                    Time Left: {item.timeLeft}
                  </TimeLeftTag>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </ContentBox>
    </>
  );
}

export default CustomerBiddingDashboard;
