import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import About from './pages/About';
import Contact from './pages/Contact';
import { Container, Grid } from '@mui/material';
import Switch from './components/UI/Switch';
import { blueGrey } from '@mui/material/colors';
import Item from './pages/Item';
import 'swiper/css/bundle';
import CollectionAdmin from './pages/admin/CollectionAdmin';
import EditProduct from './pages/admin/EditProduct';
import AddProduct from './pages/admin/AddProduct';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function ToggleMode() {
  const colorMode = React.useContext(ColorModeContext);
  return <Switch onClick={colorMode.toggleColorMode} />;
}

const App = () => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme(
        mode === 'light'
          ? {
              palette: {
                mode,
                primary: { main: '#ff7a14' },
                background: { main: '#f6f6f6' },
              },
            }
          : { palette: { mode, background: { main: blueGrey[900] } } }
      ),
    [mode]
  );

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: 'background.main',
              minHeight: '100vh',
            }}
          >
            <Grid container justifyContent='center'>
              <Container
                maxWidth='xl'
                // sx={{ bgcolor: 'primary' }}
              >
                <Nav mode={<ToggleMode />} logout={logoutUser} />

                <Routes>
                  <Route path='/' element={<Collection />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/:itemId' element={<Item />} />
                  <Route path='/admin' element={<CollectionAdmin />} />
                  <Route path='/admin/:itemId' element={<EditProduct />} />
                  <Route path='/admin/add' element={<AddProduct />} />
                </Routes>
              </Container>
            </Grid>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
};

export default App;
