import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Stack, CssBaseline  } from '@mui/material';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Add from './components/Add';
import Auth from './utils/auth';


// import Home from './pages/Home';
import Home from './pages/Home4';
// import Signup from './pages/Signup';
import Signup from './pages/Register';
// import Login from './pages/Login';
import Login from './pages/Login2';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile2';
// import Header from './components/Header';
import Header from './components/Header/Header';
import MyEvents from './pages/MyEvents';
import UserSignup from './components/UserSignup';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
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
  return (
    <ApolloProvider client={client}>
    <ThemeProvider  theme={theme}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div>
          <CssBaseline />
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <Stack direction="row" spacing={2} justifyContent={"space-between"}>
                {Auth.loggedIn() && <Sidebar toggleColorMode={toggleColorMode} theme={theme}/>}
                
                <Routes>
                    {Auth.loggedIn() && (
                        <>
                            <Route path="/" element={<Feed />} />
                            <Route path="/myevents" element={<MyEvents />} />
                            <Route path="/signedup" element={<UserSignup />} />
                            <Route path="/me" element={<Profile />} />
                        </>
                    )}
                    {!Auth.loggedIn() && (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}
                </Routes>    
            </Stack>
          {Auth.loggedIn() && <Add />}
          </Box>  
          </div>
        </div>
      </Router>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
