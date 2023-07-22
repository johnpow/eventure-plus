import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Sidebar = ({ toggleColorMode, theme }) => {

    return (
        <Box  
        flex={1} p={2} 
        sx={{ display: { xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
            <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                <ListItemIcon>
                    <HomeIcon />    
                </ListItemIcon>
                <ListItemText primary="Homepage" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/myevents">
                <ListItemIcon>
                    <EventRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="My Events" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/signedup">
                <ListItemIcon>
                    <CheckBoxRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Signed Up" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="newEvent">
                <ListItemIcon>
                    <AddRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="New Event" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="me" >
                <ListItemIcon>
                    <AccountCircleRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={toggleColorMode}>
                    <ListItemIcon  color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{color: "#ffd54f"}}/> : <Brightness4Icon sx={{color:'#3f51b5'}}/>}
                    </ListItemIcon>
                    {theme.palette.mode === 'dark' ? "Light" : "Dark"} Mode
                </ListItemButton>
            </ListItem>
            </List>
            </Box>
        </Box>
        
    );
}
export default  Sidebar;