import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import statesAndCities from './statesAndCities'; 


const Sidebar = ({ colorMode, theme }) => {
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleStateChange = (event) => {
      setSelectedState(event.target.value);
      setSelectedCity(''); // Reset the selected city when the state changes
    };

    const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
    };

    const [selectedCategory, setSelectedCategory] = useState('All');
  
    const handleCategoryChange = (event) => {
        console.log(event.target.value);
      setSelectedCategory(event.target.value);
    };


    const handleStateAndCitySearch = () => {
        if (selectedState && selectedCity) {
          navigate(`/location/${selectedState}/${selectedCity}`);
          setSelectedState('');
          setSelectedCity('');
        }
      };

    return (
        <Box  
        sx={{ display: {xs: "none", sm: "block"}, paddingRight: '45px' }}>
            <Box position={"fixed"} sx={{ backgroundColor: "background.default", height: '100vh' }} >
            <List>
            <ListItem >
              <ListItemButton component={Link}  to="/">
                <ListItemIcon>
                    <HomeIcon />    
                </ListItemIcon>
                <ListItemText primary="Homepage" />
                </ListItemButton>
            </ListItem>
            <FormControl sx={{ marginLeft: '30px', marginBottom: '10px' }}>
            <ListItem sx={{ paddingLeft: '0' }}>Search by Category</ListItem>
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
                  <MenuItem value={"Boardgames"} component={Link} to="/category/Boardgames">Boardgames</MenuItem>
                </Select>
            </FormControl>

            <FormControl  sx={{ display: 'block', marginBottom: '10px', marginLeft: '30px' }}>
                <ListItem sx={{ paddingLeft: '0' }}>Search by Location</ListItem>
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {Object.keys(statesAndCities).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            {selectedState && (
              <FormControl sx={{ display: 'block', marginBottom: '10px', marginLeft: '30px' }}>
                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select City
                  </MenuItem>
                  {statesAndCities[selectedState].map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Button variant="contained" onClick={handleStateAndCitySearch} sx={{ display: 'block', marginLeft: '30px', marginBottom: '10px' }}>
                Search
            </Button>

            <ListItem >
                <ListItemButton  sx={{ textDecoration: 'none', color: 'inherit' }} component={Link}  to="/myevents">
                    <ListItemIcon>
                        <EventRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Events" />
                </ListItemButton>
          </ListItem>
            <ListItem >
                <ListItemButton component={Link} to="/signedup" >
                <ListItemIcon>
                    <CheckBoxRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Signed Up"/>
               </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton component={Link} to="/me" >
                <ListItemIcon>
                    <AccountCircleRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItemButton>
            </ListItem>
            <ListItem >
                <ListItemButton onClick={colorMode}>
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