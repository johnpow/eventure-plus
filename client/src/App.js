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
import Home from './pages/Home';
import Signup from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header/Header';
import MyEvents from './pages/MyEvents';
import UserSignup from './components/UserSignup';
import Category from './components/Category';
import Location from './components/Location';
import amber from '@mui/material/colors/amber';
import grey from '@mui/material/colors/grey';



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

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const getDesignTokens = (mode) => ({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              // palette values for light mode
              primary:{
                light: '#009688',
                main: '#33ab9f',
                dark: '#00695f',
                contrastText: '#fff',
              },
              secondary:{
                light: '#ef6694',
                main: '#ec407a',
                dark: '#a52c55',
                contrastText: '#fff',
              },
              divider: amber[200],
              background: {
                default: '#fffde7', 
                paper: '#fafafa',
              },
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
            }
          : {
              // palette values for dark mode
              primary:{
                light: '#009688',
                main: '#33ab9f',
                dark: '#00695f',
                contrastText: '#fff',
              },
              divider: amber[200],
              background: {
                default: '#263238',
                paper: '#385a73',
              },
              text: {
                primary: '#fff',
                secondary: 'grey[500]',
              },
            }),
      },
    });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ApolloProvider client={client}>
    <ThemeProvider  theme={theme} >
      <Router>
        <div className="flex-column justify-flex-start min-100-vh" >
          <Header position="fixed" colorMode={colorMode.toggleColorMode} theme={theme} />
          <div sx={{marginRight: 'auto', marginLeft: 'auto'}}>
          <CssBaseline />
          <Box bgcolor={"background.default"} color={"text.primary"}>
            <Stack direction="row"  justifyContent={"space-between"} >
                {Auth.loggedIn() && <Sidebar colorMode={colorMode.toggleColorMode} theme={theme}/>}
                
                <Routes>
                    {Auth.loggedIn() && (
                        <>
                            <Route path="/" element={<Feed />} />
                            <Route path="/myevents" element={<MyEvents />} />
                            <Route path="/signedup" element={<UserSignup />} />
                            <Route path="/me" element={<Profile />} />
                            <Route path="/category/:category" element={<Category />} />
                            <Route path="/location/:state/:city" element={<Location />} />
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
          {Auth.loggedIn() && <Add colorMode={colorMode.toggleColorMode} theme={theme}/>}
          </Box>  
          </div>
        </div>
      </Router>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
