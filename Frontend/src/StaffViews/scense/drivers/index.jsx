import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../../base/theme";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import GetItemsManager from "../../getItemManager";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const DriverManager = () => {
    const [teamDeatails, setTeamDetails] = useState([]);


    useEffect(() => {
        GetItemsManager.getTeamDataManager()
            .then((result) => {
                // Assuming result.data is the array you want
                const teamData = result.data || [];
                setTeamDetails(teamData);
            })
            .catch((error) => {
                console.error("Error fetching team data:", error);
            });
    }, []);
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const columns = [
        { field: "id", headerName: "ProductID" },
        { field: "picture", headerName: "ProductPicture", flex: 1 },
        { field: "name", headerName: "ProductName", flex: 1, cellClassName: "name-column--cell" },
        { field: "price", headerName: "ProductPrice", flex: 1 },
       
    ];

    return (
        <Box>
            <Header title="Sell Management" subtitle="Adding The Product" />
            <Box>
                <DataGrid
                    rows={teamDeatails}
                    columns={columns}
                    pageSize={12}
                />
            </Box>
            <Link to="/add-driver" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 1, }}>
                    <Button 
                        startIcon={<LibraryAddIcon />}
                        justifyContent="center"
                        variant="contained"
                        sx={{
                        mt: 5,
                        mb: 5,
                        width: '120px',      // Initial width
                        height: '60px',      // Initial height
                        backgroundColor: 'blue', // Initial background color
                        color: 'white',     // Button text color
                        display: 'flex',     // Flexbox for center alignment
                        justifyContent: 'left', // Center align the content
                        alignItems: 'center',
                        transition: 'all 0.3s ease',  // Smooth transition for hover effects

                        '&:hover': {
                        width: '150px',    // Expands width on hover
                        height: '70px',    // Expands height on hover
                        backgroundColor: '#28a745', // Slightly lighter green on hover
                        },
    
                        '&:active': {
                          backgroundColor: '#1e7e34',  // Darker green when clicked
                         }
                            }}
                        >
                        Add Product
                        </Button>
                    </Box>
                </Grid>
            </Link>
        </Box>
    );
};

export default DriverManager;