import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../../base/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import GetItemsAdmin from "../../getItemAdmin";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const TeamAdmin = () => {
    const [teamDeatails, setTeamDetails] = useState([]);


    useEffect(() => {
        GetItemsAdmin.getTeamDataAdmin()
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
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "NAME", flex: 1, cellClassName: "name-column--cell" },
        { field: "phone", headerName: "PHONE#", flex: 1 },
        { field: "email", headerName: "EMAIL", flex: 1 },
        {
            field: "access",
            headerName: "ACCESS",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        justifyContent="center"
                        alignItems="center" // Added for vertical alignment
                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[600]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "Teacher" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography variant="body1" color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "edit",
            headerName: "EDIT",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Link to={`/editTeam/${row.id}`} style={{ textDecoration: "none" }}>
                        <Box
                            width="40%"
                            m="0 auto"
                            p="5px"
                            justifyContent="center"
                            alignItems="center" // Added for vertical alignment
                            backgroundColor={
                                row.access === "admin"
                                    ? colors.greenAccent[600]
                                    : colors.greenAccent[700]
                            }
                            borderRadius="4px"
                        >
                            <EditOutlinedIcon />
        
                            <Typography variant="body1" color={colors.grey[100]} sx={{ ml: "5px" }}>
                                Edit
                            </Typography>
                        </Box>
                    </Link>
                );
            },
        },
        
    ];
    
      

    return (
        <Box>
            <Header title="Team" subtitle="Managing the Team" />
            <Box>
                <DataGrid
                    rows={teamDeatails}
                    columns={columns}
                    pageSize={12}
                />
            </Box>
            <Link to="/AddTeam" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 2, }}>
                        <Button 
                            startIcon={<PersonAddAltOutlinedIcon />}
                            justifyContent="center"
                            variant="contained"
                            size="large"
                            color = "success"
                            >Add Team Member
                        </Button>
                    </Box>
                </Grid>
            </Link>
        </Box>
    );
};

export default TeamAdmin;