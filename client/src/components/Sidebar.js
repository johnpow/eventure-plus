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


const Sidebar = ({ toggleColorMode, theme }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
  
    const handleCategoryChange = (event) => {
        console.log(event.target.value);
      setSelectedCategory(event.target.value);
    };

    return (
        <Box  
        flex={1} p={2} 
        sx={{ display: { xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
            <List>
            <ListItem >
              <ListItemButton component={Link}  to="/">
                <ListItemIcon>
                    <HomeIcon />    
                </ListItemIcon>
                <ListItemText primary="Homepage" />
                </ListItemButton>
            </ListItem>
            <FormControl sx={{ marginBottom: '10px', marginLeft: '15px', minWidth: 150 }}>
            <ListItem>Search by Category</ListItem>
                <Select value={selectedCategory} onChange={handleCategoryChange}>
                  <MenuItem value="All" component={Link} to="/category/All">All</MenuItem>
                  <MenuItem value={"Arts and Crafts"} component={Link} to="/category/Arts and Crafts">Arts and Crafts</MenuItem>
                  <MenuItem value={"Education"} component={Link} to="/category/Education">Education</MenuItem>
                  <MenuItem value={"Entertainment"} component={Link} to="/category/Entertainment">Entertainment</MenuItem>
                  <MenuItem value={"Music"} component={Link} to="/category/Music">Music</MenuItem>
                  <MenuItem value={"Outdoors"} component={Link} to="/category/Outdoors">Outdoors</MenuItem>
                  <MenuItem value={"Pets"} component={Link} to="/category/Pets">Pets</MenuItem>
                  <MenuItem value={"Sports"} component={Link} to="/category/Sports">Sports</MenuItem>
                  <MenuItem value={"Social"} component={Link} to="/category/Social">Social</MenuItem>
                  <MenuItem value={"Tech"} component={Link} to="/category/Tech">Tech</MenuItem>
                  <MenuItem value={"Trivia"} component={Link} to="/category/Trivia">Trivia</MenuItem>
                </Select>
            </FormControl>
            <ListItem >
                <ListItemButton component={Link} to="/myevents">
                    <ListItemIcon>
                        <EventRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Events" />
                </ListItemButton>
          </ListItem>
            <ListItem >
                <ListItemButton component={Link} to="/signedup">
                <ListItemIcon>
                    <CheckBoxRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Signed Up" />
               </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton component='a' href="me" >
                <ListItemIcon>
                    <AccountCircleRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItemButton>
            </ListItem>
            <ListItem >
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