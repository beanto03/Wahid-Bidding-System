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



const AddTransactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [file, setFile] = useState(null);
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleAddTrans = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
      
        try {
          const success = await SaveItemsManager.addTransSave(file, code);
          
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
    
        <Header title="Add Transactions" subtitle="Enter New Tranaction Details" />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddTrans}>
                <TextField
                onChange={(e) => setCode(e.target.value)}
                label="Enter the Transaction Number"
                id="code"
                sx={{ m: 1, width: '30%' }}
                variant="filled"
                />
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                    <InputLabel htmlFor="file-upload">Upload File</InputLabel>
                    <Input
                        accept="file/*"
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="file image"
                                    edge="end"
                                    component="label"
                                    htmlFor="file-upload"
                                >
                                    <PublishIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="image-upload-helper-text">Select an image file</FormHelperText>
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

export default AddTransactions;