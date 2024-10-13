import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from '../../Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import { purple, blue, pink } from '@mui/material/colors';

import { buildingImage } from '../../assets/images';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Bidding System Registration Page
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    try {
      const success = await AuthService.register({ name, email, password, role });
      if (success) {

        navigate("/login");  // After successful registration, navigate to user dashboard

      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <Box
       sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        backgroundImage: `url(${buildingImage})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        boxSizing: 'border-box',
      }}
      >

      <Grid 
        container 
        component="main" 
        sx={{ 

          height: '100vh', 

          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          backgroundImage: 'url(https://source.unsplash.com/random?technology)',
          backgroundRepeat: 'no-repeat',

          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            background: 'linear-gradient(135deg, #81cdfc 35%, #e3a2fc 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '400px', // Limit max width of the form
              mx: 'auto', // Center horizontally
              my: 'auto', // Center vertically
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: 'secondary.main',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {/* Form fields (name, email, password) */}
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    sx={{
                      input: {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: blue[400] },
                        '&.Mui-focused fieldset': { borderColor: pink[300] },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      input: {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: blue[400] },
                        '&.Mui-focused fieldset': { borderColor: pink[300] },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      input: {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: blue[400] },
                        '&.Mui-focused fieldset': { borderColor: pink[300] },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{
                      input: {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: blue[400] },
                        '&.Mui-focused fieldset': { borderColor: pink[300] },
                      },
                    }}
                  />
                </Grid>
                {/* Role Selection */}
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{ color: 'white' }}>Select Role</FormLabel>
                    <RadioGroup
                      aria-label="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}  // Ensure value is converted to a number
                      row
                    > 
                    <FormControlLabel value={"seller"} control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: pink[300] } }} />} label="Seller" />
                    <FormControlLabel value={"buyer"} control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: pink[300] } }} />} label="Bidder" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  bgcolor: blue[500], 
                  '&:hover': { bgcolor: pink[500] },
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" sx={{ color: 'white' }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5, color: 'white' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      </Box>

    </ThemeProvider>
  );
}
