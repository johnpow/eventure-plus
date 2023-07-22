import React, { useEffect } from 'react';
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
  const [selectedCity, setSelectedCity] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);

  // GraphQL mutation for updating user's bio and city
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: QUERY_USER, variables: { username: userParam } }],
  });

  useEffect(() => {
    // Set the local state with the latest data from the server after the data is fetched
    setBio(user.bio || '');
    setSelectedCity(user.city || '');
  }, [user.bio, user.city]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
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
        city: selectedCity,
      },
      onCompleted: (data) => {
        // Update the local state with the latest data from the server
        setBio(data.updateUser.bio);
        setSelectedCity(data.updateUser.city);
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
    container
    spacing={1} 
    className={classes.cardContainer2} 
    >
            <Box p={2}>
              <Typography variant="h5">Viewing {user.username}'s profile.</Typography>

              {/* Bio */}
              <Typography variant="h6">Bio:</Typography>
              <TextField
                multiline
                fullWidth
                rows={4}
                value={bio}
                onChange={handleBioChange}
                variant="outlined"
                disabled={!editMode} // Disable the input when not in edit mode
              />

              {/* Select City */}
              <Typography variant="h6">Select City:</Typography>
              <TextField
                select
                fullWidth
                value={selectedCity}
                onChange={handleCityChange}
                variant="outlined"
                disabled={!editMode} // Disable the input when not in edit mode
              >
                <MenuItem value="Seattle, WA">Seattle, WA</MenuItem>
                <MenuItem value="New York, NY">New York, NY</MenuItem>
                <MenuItem value="Los Angeles, CA">Los Angeles, CA</MenuItem>
                <MenuItem value="Miami, FL">Miami, FL</MenuItem>
                <MenuItem value="No preference">No preference</MenuItem>
              </TextField>

              {/* Edit and Save Buttons */}
              {editMode ? (
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
            </Box>
          </Grid>
  );
};

export default Profile;
