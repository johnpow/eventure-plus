import React, { useState } from 'react';
import { Box } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const Sidebar = ({ toggleColorMode, theme, onCategorySelect, setShowMyEvents }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
      onCategorySelect(event.target.value); // Call the callback function with the selected category
    };

    const handleMyEventsClick = () => {
        setSelectedCategory('All'); // Reset selected category to 'All' when switching to My Events
        // setShowMyEvents(true); // Set showMyEvents to true to display the user's events
      };

    return (
        <Box  
        flex={1} p={2} 
        sx={{ display: { xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
            <List>
            <ListItem disablePadding>
                <ListItemButton component={Link}  to="/">
                <ListItemIcon>
                    <HomeIcon />    
                </ListItemIcon>
                <ListItemText primary="Homepage" />
                </ListItemButton>
            </ListItem>
            <FormControl disablePadding sx={{ marginBottom: '10px', marginLeft: '15px', minWidth: 150 }}>
            <ListItem>Search by Category</ListItem>
                <Select value={selectedCategory} onChange={handleCategoryChange}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value={"Arts and Crafts"}>Arts and Crafts</MenuItem>
                  <MenuItem value={"Education"}>Education</MenuItem>
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Music"}>Music</MenuItem>
                  <MenuItem value={"Outdoors"}>Outdoors</MenuItem>
                  <MenuItem value={"Pets"}>Pets</MenuItem>
                  <MenuItem value={"Sports"}>Sports</MenuItem>
                  <MenuItem value={"Social"}>Social</MenuItem>
                  <MenuItem value={"Tech"}>Tech</MenuItem>
                  <MenuItem value={"Trivia"}>Trivia</MenuItem>
                </Select>
            </FormControl>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/my-events">
                {/* // onClick={() => setShowMyEvents((prevShowMyEvents) => !prevShowMyEvents)} > Toggle showMyEvents */}
                    <ListItemIcon>
                        <EventRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Events" />
                </ListItemButton>
          </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="#signedUp">
                    <ListItemIcon>
                        <CheckBoxRoundedIcon />    
                    </ListItemIcon>
                    <ListItemText primary="Signed Up" />
                </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
                <ListItemButton component='a' href="newEvent">
                <ListItemIcon>
                    <AddRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="New Event" />
                </ListItemButton>
            </ListItem> */}
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