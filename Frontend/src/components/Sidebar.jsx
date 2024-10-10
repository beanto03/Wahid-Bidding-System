// src/components/Sidebar.jsx
import React from 'react';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Avatar,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import GavelIcon from '@mui/icons-material/Gavel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

// Styled Components
const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: 'grey' , // Updated sidebar color
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
}));

const ProfileBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(1),
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
}));

function Sidebar() {
  const navigate = useNavigate();

  // Handler functions
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <ProfileBox>
        <StyledAvatar alt="Profile Picture" src="https://via.placeholder.com/150" />
        <HeaderTypography variant="h6">Aiman Doe</HeaderTypography>
        <HeaderTypography variant="body2">aimanDoe@gmail.com</HeaderTypography>
      </ProfileBox>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', marginBottom: 2 }} />
      <List>
        <StyledListItem button onClick={() => handleNavigation('/biddingPage')}>
          <ListItemIcon>
            <GavelIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Make Bidding" sx={{ color: 'white' }} />
        </StyledListItem>
        <StyledListItem button onClick={() => handleNavigation('/biddingHistory')}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="My Bids" sx={{ color: 'white' }} />
        </StyledListItem>
        <StyledListItem button onClick={() => handleNavigation('/login')}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: 'white' }} />
        </StyledListItem>
      </List>
    </StyledDrawer>
  );
}

export default Sidebar;
