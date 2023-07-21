import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { Box, Stack, CssBaseline  } from '@mui/material';
import Add from '../components/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Home() {
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
    <ThemeProvider  theme={theme}>
      <CssBaseline />
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <Sidebar toggleColorMode={toggleColorMode} theme={theme}/>
          <Feed />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
