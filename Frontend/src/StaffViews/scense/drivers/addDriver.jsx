import React, { useState } from 'react';
import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';  // Import the PhotoCamera icon
import { useNavigate } from 'react-router-dom';
import SaveItemsManager from '../../saveItemManager';

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
    
        <Header title="Add Product" subtitle="Enter New Product Details" />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddTeam}>
                <TextField
                onChange={(e) => setFirstName(e.target.value)}
                label="Enter Product Name"
                id="product_name"
                sx={{ m: 1, width: '30%' }}
                variant="filled"
                />

                <TextField
                onChange={(e) => setLastname(e.target.value)}
                label="Please Enter Product Price"
                id="product_price"
                sx={{ m: 1, width: '30%' }}
                variant="filled"
                />
    
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
              
                <FormControl sx={{ m: 1, width: '93%' }} variant="filled">

                <Button
  type="submit"
  variant="contained"
  sx={{
    mt: 1,
    mb: 1,
    backgroundColor: 'red',
    width: '100px',       // Making the button square
    height: '50px',      // Making the button square
    transition: 'all 0.4s ease',  // Smooth transition for hover effects
    '&:hover': {
      width: '150px',     // Expands width on hover
      height: '60px',    // Expands height on hover
      backgroundColor: '#3f51b5',  // Optional: change background color on hover
    },
    '&:active': {
      backgroundColor: '#303f9f',  // Change color when clicked
    },
  }}
>
  Save
</Button>

                </FormControl>
        </Box> 
    </Box>
  );
};

export default AddDriver;