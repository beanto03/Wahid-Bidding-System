import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../../base/theme";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import GetItemsManager from "../../getItemManager";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const TransactionsManager = () => {
    const [transactionDetails, setTransactionDetails] = useState([]);


    useEffect(() => {
        GetItemsManager.getTransDataManager()
            .then((result) => {
                // Assuming result.data is the array you want
                const transData = result.data || [];
                setTransactionDetails(transData);
            })
            .catch((error) => {
                console.error("Error fetching transaction data:", error);
            });
    }, []);
    
    

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    


    const columns = [
        { field: "id", headerName: "ID" },
        { field: "begin_date", headerName: "BEGIN DATE", flex: 1, cellClassName: "name-column--cell" },
        { field: "end_date", headerName: "END DATE", flex: 1 },
        { field: "sum", headerName: "TOTAL AMOUNT", flex: 1 },
        {
            field: "edit",
            headerName: "EDIT",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Link to={`/editTransaction/${row.id}`} style={{ textDecoration: "none" }}>
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
            <Header title="Transactions" subtitle="Managing the Transactions" />
            <Box>
                <DataGrid
                    rows={transactionDetails}
                    columns={columns}
                    pageSize={12}
                />
            </Box>
            <Link to="/add-transaction" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 2, }}>
                        <Button 
                            startIcon={<PersonAddAltOutlinedIcon />}
                            justifyContent="center"
                            variant="contained"
                            size="large"
                            color = "success"
                            >Add Transactions
                        </Button>
                    </Box>
                </Grid>
            </Link>
        </Box>
    );
};

export default TransactionsManager;