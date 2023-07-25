import React from 'react';
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material";
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { FormControl, Select, MenuItem } from '@mui/material';
import statesAndCities from '../statesAndCities';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Header = ({ colorMode, theme }) => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };
    
    const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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

    const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
                  <MenuItem value={"Trivia"} component={Link} to="/category/Boardgames">Boardgames</MenuItem>
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
  );  
      
      
    return (
        <AppBar position="sticky" >
            <StyledToolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                backgroundColor: 'primary',
                color: "white", // Set the text color to white
                textDecoration: "none", // Remove the underline
                transition: 'transform 0.3s', // Add a 0.3-second transition to the transform property
                  '&:hover': {
                  color: "white", // Set the text color to white on hover
                  textDecoration: "none", // Remove the underline on hover
                  transform: 'scale(1.03)', // Scale the text by 5% on hover
                  },
                }}
              component={Link} // Use MUI's Link component to avoid default link styles
              to="/"
              >
              Eventure
            </Typography>
            <React.Fragment key={'left'}>
              {Auth.loggedIn() ? 
                <MenuIcon 
                sx={{ display: {xs: "block", sm: "none"}}}
                onClick={toggleDrawer('left', true)}
              /> : <MenuIcon sx={{ display: {xs: "block", sm: "none"}}} /> }
              <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
              >
                {list('left')}
              </Drawer>
        </React.Fragment>
            
            <div>
          {Auth.loggedIn() ? (
            <>
              <Button variant="contained"  onClick={logout}>
                Logout
              </Button>
            </>

            
          ) : (
            <>
                <Button variant="text" component={Link} to="/login" 
                sx={{color: "white", '&:hover': {color: 'white'}}}>
                    Login 
                </Button>
                <Button variant="text" component={Link} to="/signup" 
                sx={{color: "white", '&:hover': {color: 'white'}}}>
                    Register
                </Button>
            </>
          )}
        </div> 
            </StyledToolbar>   
        </AppBar>
    );
}

export default Header;