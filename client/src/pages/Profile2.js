import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations'; // Import the UPDATE_USER mutation
import Auth from '../utils/auth';
import Grid from '@mui/material/Grid';
import Sidebar from '../components/Sidebar';
import { Box, CssBaseline, Typography, TextField, MenuItem, Button } from '@mui/material';
import Add from '../components/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useStyles from '../components/styles';
import statesAndCities from '../components/statesAndCities'; 
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListItem } from "@mui/material";


const Profile = () => {
  const [mode, setMode] = React.useState('light');
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const classes = useStyles();
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // State variables for bio, city, and edit mode
  const [bio, setBio] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);

  // GraphQL mutation for updating user's bio and city
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: QUERY_USER, variables: { username: userParam } }],
  });

  useEffect(() => {
    // Set the local state with the latest data from the server after the data is fetched
    setBio(user.bio || '');
    setSelectedCity(user.city || '');
    setSelectedState(user.state || '');
  }, [user.bio, user.state, user.city]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const [state, setSelectedState] = useState('');
  const [city, setSelectedCity] = useState('');

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity(''); // Reset the selected city when the state changes
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    updateUser({
      variables: {
        username: user.username,
        email: user.email,
        bio: bio,
        city: city,
        state: state
      },
      onCompleted: (data) => {
        // Update the local state with the latest data from the server
        setBio(data.updateUser.bio);
        setSelectedCity(data.updateUser.city);
        setSelectedState(data.updateUser.state);
      },
    });
    setEditMode(false);
  };

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <Grid
    
    className={classes.cardContainer2} 
    >
            <Box p={2} >
              <Typography variant="h5">Viewing {user.username}'s profile.</Typography>

              {/* Bio */}
              <Typography variant="h6">Bio:</Typography>
              <TextField
                sx={{ width: {lg: '500px', md: '500px', sm: '500px', xs:'320px'}, marginBottom: '25px'}}
                multiline
                rows={4}
                value={bio}
                onChange={handleBioChange}
                variant="outlined"
                disabled={!editMode} // Disable the input when not in edit mode
              />

              {/* Select City */}
              <FormControl  sx={{ display: 'block', marginBottom: '10px' }}>
                <ListItem sx={{ paddingLeft: '0' }}>Set your State and City</ListItem>
                <Select
                  value={state}
                  onChange={handleStateChange}
                  disabled={!editMode}
                >
                  <MenuItem value=''>
                    Select State
                  </MenuItem>
                  {Object.keys(statesAndCities).map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>

            {state && (state !== "No preference") && (
              <FormControl sx={{ display: 'block', marginBottom: '10px'}}>
                <Select
                  value={city}
                  onChange={handleCityChange}
                  disabled={!editMode}
                >
                  <MenuItem value="">
                    Select City
                  </MenuItem>
                  {statesAndCities[state].map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

              {/* Edit and Save Buttons */}
              {editMode ? (
                <Button sx={{display: "block", marginTop: '20px'}} variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button sx={{display: "block", marginTop: '20px'}} variant="contained" color="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </Box>
          </Grid>
  );
};

export default Profile;
