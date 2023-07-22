import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import MyEvents from './MyEvents';
import { Box, Stack, CssBaseline, Button } from '@mui/material';
import Add from '../components/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EventureBG from '../images/cards/eventureBG.png';
import Auth from '../utils/auth';

function Home() {
  const [mode, setMode] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMyEvents, setShowMyEvents] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowMyEvents(false);
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  return (
    <ThemeProvider theme={theme}>/
      <CssBaseline />
      <Box bgcolor={'background.default'} color={'text.primary'}>
      <Stack direction="row" spacing={2} justifyContent={'space-between'}>
          {isLoggedIn ? (
            <>
              <Sidebar 
              toggleColorMode={toggleColorMode} 
              theme={theme} 
              onCategorySelect={handleCategorySelect} 
              setShowMyEvents={setShowMyEvents}/>
              {showMyEvents ? ( // Conditionally render MyEvents or Feed based on showMyEvents
                <MyEvents />
              ) : (
                <Feed selectedCategory={selectedCategory} />
              )}
            </>
          ) : (
            <img src={EventureBG} alt="Eventure Background" />
          )}
        </Stack>
        {/* Conditionally render the Add button only when logged in */}
        {isLoggedIn && <Add />}
      </Box>
      {/* Render the modal-like box only if the user is not logged in */}
      {!isLoggedIn && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
        >
          <Box bgcolor="white" p={4} borderRadius={8} boxShadow={4} textAlign="center">
            <h2>Welcome to Eventure</h2>
            <p>Your next adventure begins here.</p>
            <Button variant="contained" color="primary" component={Link} to="/login">
              Login
            </Button>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default Home;
