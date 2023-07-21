import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


import Sidebar from '../components/Sidebar';
import { Box, Stack, CssBaseline  } from '@mui/material';
import Add from '../components/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Profile = () => {

  const [mode, setMode] = React.useState('light');
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

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <ThemeProvider  theme={theme}>
      <CssBaseline />
      <Box bgcolor={"background.default"} color={"text.primary"} >
        
        
          
            <div flex-row justify-center mb-3>
              <h2   justifyContent={"center"}>
                Viewing {user.username}'s profile.
              </h2>
              {/* <div className="col-12 col-md-10 mb-5">
                <ThoughtList
                  thoughts={user.thoughts}
                  title={`${user.username}'s thoughts...`}
                  showTitle={false}
                  showUsername={false}
                />
              </div>
              {!userParam && (
                <div
                  className="col-12 col-md-10 mb-3 p-3"
                  style={{ border: '1px dotted #1a1a1a' }}
                >
                  <ThoughtForm />
                </div>
              )} */}
            </div>
          
            <Sidebar toggleColorMode={toggleColorMode} theme={theme}/>
          <Add />
      </Box>
      
    </ThemeProvider>
  );
};

export default Profile;