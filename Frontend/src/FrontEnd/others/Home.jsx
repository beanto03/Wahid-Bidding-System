import React, { useState, useEffect } from 'react';
import { carbidding, housebidding } from "../../assets/images";

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
  LinearProgress 
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
  // State for bids
  const [carBid, setCarBid] = useState(1000); // Starting bid for car
  const [houseBid, setHouseBid] = useState(5000); // Starting bid for house

  // State for bid inputs
  const [carBidInput, setCarBidInput] = useState('');
  const [houseBidInput, setHouseBidInput] = useState('');

  // State for capturing the time of the last bid
  const [carBidTime, setCarBidTime] = useState(null);
  const [houseBidTime, setHouseBidTime] = useState(null);

  // Auction end times (e.g., 5 minutes from component mount)
  const [carEndTime] = useState(Date.now() + 1 * 60 * 1000); // 1 minute for example
  const [houseEndTime] = useState(Date.now() + 5 * 60 * 1000); // 5 minutes

  // State for timers
  const [carTimeLeft, setCarTimeLeft] = useState(carEndTime - Date.now());
  const [houseTimeLeft, setHouseTimeLeft] = useState(houseEndTime - Date.now());
        
  // Timer logic for Car Bidding
  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = carEndTime - Date.now();
      if (timeLeft <= 0) {
        clearInterval(timer);
        setCarTimeLeft(0);
      } else {
        setCarTimeLeft(timeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [carEndTime]);

  // Timer logic for House Bidding
  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = houseEndTime - Date.now();
      if (timeLeft <= 0) {
        clearInterval(timer);
        setHouseTimeLeft(0);
      } else {
        setHouseTimeLeft(timeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [houseEndTime]);

  // Function to format time in mm:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle bid submission for car
  const handleCarBid = (e) => {
    e.preventDefault();
    const newBid = parseFloat(carBidInput);
    if (newBid > carBid && carTimeLeft > 0) {
      setCarBid(newBid);
      setCarBidTime(new Date().toLocaleString()); // Capture the current time
      setCarBidInput('');
    } else if (carTimeLeft <= 0) {
      alert('The bidding time for the car has ended.');
    } else {
      alert('Your bid must be higher than the current bid.');
    }
  };

  // Handle bid submission for house
  const handleHouseBid = (e) => {
    e.preventDefault();
    const newBid = parseFloat(houseBidInput);
    if (newBid > houseBid && houseTimeLeft > 0) {
      setHouseBid(newBid);
      setHouseBidTime(new Date().toLocaleString()); // Capture the current time
      setHouseBidInput('');
    } else if (houseTimeLeft <= 0) {
      alert('The bidding time for the house has ended.');
    } else {
      alert('Your bid must be higher than the current bid.');
    }
  };

  return (
    <>
      <Sidebar />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          boxSizing: 'border-box',
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
        
        <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', maxWidth: '1200px' }}>
          {/* Car Bidding Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                maxWidth: 345, 
                margin: '0 auto', 
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: 6 
                },
                background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                color: '#fff',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={carbidding}
                alt="Car Bidding"
                sx={{ 
                  borderTopLeftRadius: '4px', 
                  borderTopRightRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Car Bidding
                </Typography>
                <Typography variant="body1">
                  Current Bid: ${carBid.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Time Left: {formatTime(carTimeLeft)}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={carTimeLeft > 0 ? (carEndTime - Date.now()) / (1 * 60 * 1000) * 100 : 0} 
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#fff',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: carTimeLeft > 0 ? '#fda085' : '#ccc',
                      },
                      mt: 1,
                    }}
                  />
                </Box>
                {carBidTime && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Last Bid Time: {carBidTime}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', padding: 2 }}>
                <form onSubmit={handleCarBid} style={{ width: '100%' }}>
                  <TextField
                    type="number"
                    value={carBidInput}
                    onChange={(e) => setCarBidInput(e.target.value)}
                    placeholder="Enter your bid"
                    fullWidth
                    variant="outlined"
                    size="small"
                    disabled={carTimeLeft <= 0}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#fff' },
                        '&:hover fieldset': { borderColor: '#fda085' },
                        '&.Mui-focused fieldset': { borderColor: '#f6d365' },
                      },
                      input: { color: '#fff' },
                      '& .MuiInputLabel-root': { color: '#fff' },
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                    }}
                  />
                  <GradientButton type="submit" fullWidth disabled={carTimeLeft <= 0}>
                    {carTimeLeft > 0 ? 'Place Bid' : 'Bidding Ended'}
                  </GradientButton>
                </form>
              </CardActions>
            </Card>
          </Grid>

          {/* House Bidding Card */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                maxWidth: 345, 
                margin: '0 auto', 
                transition: 'transform 0.2s',
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: 6 
                },
                background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                color: '#fff',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={housebidding}
                alt="House Bidding"
                sx={{ 
                  borderTopLeftRadius: '4px', 
                  borderTopRightRadius: '4px',
                  cursor: 'pointer',
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  House Bidding
                </Typography>
                <Typography variant="body1">
                  Current Bid: ${houseBid.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Time Left: {formatTime(houseTimeLeft)}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={houseTimeLeft > 0 ? (houseEndTime - Date.now()) / (5 * 60 * 1000) * 100 : 0} 
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#fff',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: houseTimeLeft > 0 ? '#c2e9fb' : '#ccc',
                      },
                      mt: 1,
                    }}
                  />
                </Box>
                {houseBidTime && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Last Bid Time: {houseBidTime}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', flexDirection: 'column', padding: 2 }}>
                <form onSubmit={handleHouseBid} style={{ width: '100%' }}>
                  <TextField
                    type="number"
                    value={houseBidInput}
                    onChange={(e) => setHouseBidInput(e.target.value)}
                    placeholder="Enter your bid"
                    fullWidth
                    variant="outlined"
                    size="small"
                    disabled={houseTimeLeft <= 0}
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
                  <GradientButton type="submit" fullWidth disabled={houseTimeLeft <= 0}>
                    {houseTimeLeft > 0 ? 'Place Bid' : 'Bidding Ended'}
                  </GradientButton>
                </form>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
