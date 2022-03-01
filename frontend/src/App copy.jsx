import { Routes, Route } from 'react-router-dom';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import About from './pages/About';
import Contact from './pages/Contact';
import { useState } from 'react';
import { createTheme, ThemeProvider, Container, Grid } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Box } from '@mui/system';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#ff7a14',
    //   background: blueGrey[900],
    // },
    // secondary: { main: '#ffcd9b' },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#ff7a14',
    //   background: '#f6f6f6',
    // },
    // secondary: { main: '#ffcd9b' },
  },
});

const App = () => {
  const [theme, setTheme] = useState(true);
  return (
    <>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <Box
          sx={{
            // backgroundColor: 'primary.background',
            height: '100vh',
          }}
        >
          <Grid container justifyContent='center'>
            <Container
              maxWidth='xl'
              // sx={{ bgcolor: 'primary' }}
            >
              <Nav
              // theme={theme}
              />
              <Routes>
                <Route path='/' element={<Collection />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Routes>
            </Container>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
