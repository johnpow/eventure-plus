import React from 'react';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { Box, Stack, ThemeProvider, createTheme } from '@mui/material';
import Add from '../components/Add';
import { useState } from 'react';

function Home() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme  ({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Stack direction="row" spacing={2} justifyContent={"space-between"}>
          <Sidebar setMode={setMode} mode={mode} />
          <Feed />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
