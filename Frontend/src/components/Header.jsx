import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../base/theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="30px" p={2}>

            <Typography variant="h1" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5px" }}>
                {title}
            </Typography>
            <Typography variant="h1" color={colors.greenAccent[400]}>

                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
