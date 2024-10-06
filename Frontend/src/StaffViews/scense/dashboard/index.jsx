import { Box } from "@mui/material";
import Header from "../../../components/Header";

const DashboardStaff = () =>{
    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle = "Welcome to OneHead Bidding Website" />
        </Box>
    </Box>
}

export default DashboardStaff;