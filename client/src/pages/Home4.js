import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import EventureBG from '../images/cards/eventureBG.png';

function Home() {
  return (
    <>
      <img src={EventureBG} alt="Eventure Background" />
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
     
    </>
  );
}

export default Home;
