
import React, { useState } from 'react';
import { Box, useTheme, Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import SaveItemsManager from '../../saveItemManager';
import PublishIcon from '@mui/icons-material/Publish';



const AddSuburb = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [name, setName] = useState("");
    const [fee, setFee] = useState("");
    const navigate = useNavigate();


    const handleAddSuburb = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
      
        try {
          const success = await SaveItemsManager.addSuburbSave(name, fee);
          
          if (success) {
            navigate("/suburbs-manager");
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
    
        <Header title="Add Suburb" subtitle="Enter New Suburb Details" />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddSuburb}>
                <TextField
                onChange={(e) => setName(e.target.value)}
                label="Enter the Suburb Name"
                id="name"
                sx={{ m: 1, width: '48%' }}
                variant="filled"
                />
                <TextField
                onChange={(e) => setFee(e.target.value)}
                label="Enter Each Trip Fee in AUD"
                id="fee"
                sx={{ m: 1, width: '48%' }}
                variant="filled"
                />
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
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

export default AddSuburb;
