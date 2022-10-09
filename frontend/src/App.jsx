import * as React from 'react';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// MUI Components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Grid, Box, IconButton } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Nav from './components/Nav';

// Shared Pages
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';

// User Pages
import Collection from './pages/user/Collection';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import Item from './pages/user/Item';

// Admin Pages
import CollectionAdmin from './pages/admin/CollectionAdmin';
import EditProduct from './pages/admin/EditProduct';
import AddProduct from './pages/admin/AddProduct';

import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from './features/auth/authSlice';
import 'swiper/css/bundle';
import { setInitialCartItems } from './features/cart/cartSlice';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set initial cart
  useEffect(() => {
    dispatch(setInitialCartItems());
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  const getColorMode = localStorage.getItem('colorMode') || 'light';
  const [mode, setMode] = React.useState(getColorMode);

  React.useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  const { user } = useSelector((state) => state.auth);

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

  function ToggleMode() {
    const colorMode = React.useContext(ColorModeContext);
    return (
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color='inherit'
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon color='action' />
        ) : (
          <Brightness4Icon color='action' />
        )}
      </IconButton>
    );
  }

  let routes;
  if (user?.isAdmin) {
    routes = (
      <>
        <Route path='/' element={<CollectionAdmin />} />
        <Route path='/admin/:itemId' element={<EditProduct />} />
        <Route path='/admin/add' element={<AddProduct />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/item/:itemId' element={<Item />} />
      </>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: 'background.main',
            minHeight: '100vh',
          }}
        >
          <Grid container justifyContent='center'>
            <Container maxWidth='xl'>
              <Nav mode={<ToggleMode />} logout={logoutUser} />
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {routes}
              </Routes>
            </Container>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
