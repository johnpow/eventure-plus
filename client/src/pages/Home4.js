import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import EventureBG from '../images/cards/eventureBG.png';

function Home() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${EventureBG})`, // Set the background image here
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box
        textAlign="center"
        p={4}
        borderRadius={8}
        boxShadow={4}
        bgcolor="white"
        maxWidth="400px"
        width="90%"
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Eventure!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your adventure starts here.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          style={{ marginTop: '20px' }}
          fullWidth
        >
          Get Started
        </Button>
      </Box>
    </Grid>
  );
}

export default Home;
