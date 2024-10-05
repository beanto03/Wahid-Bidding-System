import React, { useState } from 'react';
import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCamera from '@mui/icons-material/PhotoCamera';  // Import the PhotoCamera icon
import { useNavigate } from 'react-router-dom';
import SaveItemsManager from '../../saveItemManager';
import TelegramIcon from '@mui/icons-material/Telegram';
import TollIcon from '@mui/icons-material/Toll';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';

const AddDriver = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [tfn, setTfn] = useState("");
    const [abn, setAbn] = useState("");
    const [isHourly, setIsHourly] = useState("");
    const [cPercentage, setCPercentage] = useState("");
    const [hRate, setHRate] = useState("");
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleAddTeam = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
      
        try {
          const success = await SaveItemsManager.addDriverSave(email, password, firstName, lastName, phone, address, dob, image, tfn, abn, isHourly, cPercentage, hRate);
          
          if (success) {
            navigate("/dashboard-staff");
          } else {
            // Handle login failure and display an error message to the user
            alert("Error Saving data");
          }
        } catch (error) {
          // Handle network or other errors
          console.error("Saving Error:", error);
          alert("An error occurred while saving.");
        }
      }

  return (
    <Box>
    
        <Header title="Add Driver" subtitle="Enter New Member Details" />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddTeam}>
                <TextField
                onChange={(e) => setFirstName(e.target.value)}
                label="Enter Your First Name"
                id="first_name"
                sx={{ m: 1, width: '30%' }}
                variant="filled"
                />

                <TextField
                onChange={(e) => setLastname(e.target.value)}
                label="Enter Your Last Name"
                id="last_name"
                sx={{ m: 1, width: '30%' }}
                variant="filled"
                />
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                <FilledInput
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    type='email'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="Envelope"
                                edge="end"                                        
                            >
                            <EmailIcon></EmailIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-phone">Telegram Number</InputLabel>
                <FilledInput
                   onChange={(e) => setPhone(e.target.value)}
                    id='phone'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="Telegram Number"
                                edge="end"                                        
                            >
                            <TelegramIcon></TelegramIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <FilledInput
                   onChange={(e) => setDob(e.target.value)}
                    id='dob'
                    type='date'
                                        
                >
                    

                </FilledInput>
                <FormHelperText id="filled-dob-helper-text">Date of Birth</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-tfn">TFN</InputLabel>
                <FilledInput
                   onChange={(e) => setTfn(e.target.value)}
                    id='tfn'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="TFN"
                                edge="end"                                        
                            >
                            <TollIcon></TollIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-tfn">ABN</InputLabel>
                <FilledInput
                   onChange={(e) => setAbn(e.target.value)}
                    id='abn'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="ABN"
                                edge="end"                                        
                            >
                            <TollIcon></TollIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                    <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
                    <Input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="upload image"
                                    edge="end"
                                    component="label"
                                    htmlFor="image-upload"
                                >
                                    <PhotoCamera />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="image-upload-helper-text">Select an image file</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }}>
                    <FormLabel  id="demo-radio-buttons-group-label">Payment Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="1"
                            name="radio-buttons-group"
                            onChange={(e) => setIsHourly(e.target.value)}
                        >
                            <Box>
                                <FormControlLabel value="1" control={<Radio />} label="Hourly Based" />
                                <FormControlLabel value="2" control={<Radio />} label="Commision Based" />
                            </Box>
                        </RadioGroup>
                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-tfn">Payment per Hour</InputLabel>
                <FilledInput
                   onChange={(e) => setHRate(e.target.value)}
                    id='peymentPerHour'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="Payment per Hour"
                                edge="end"                                        
                            >
                            <AttachMoneyIcon></AttachMoneyIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-tfn">Commision Percentage</InputLabel>
                <FilledInput
                   onChange={(e) => setCPercentage(e.target.value)}
                    id='commisionPercentage'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="Commission Percentage"
                                edge="end"                                        
                            >
                            <EmojiSymbolsIcon></EmojiSymbolsIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                
                <FormControl sx={{ m: 1, width: '93%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-address">Address</InputLabel>
                <FilledInput
                   onChange={(e) => setAddress(e.target.value)}
                    id='address'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="address"
                                edge="end"                                        
                            >
                            <LocationOnIcon></LocationOnIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
                Save
              </Button>
                </FormControl>
        </Box> 
    </Box>
  );
};

export default AddDriver;