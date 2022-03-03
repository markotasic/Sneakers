import * as React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';

// MUI Components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Switch from './components/UI/Switch';

import Nav from './components/Nav';

// Shared Pages
import Login from './pages/shared/Login';
import Register from './pages/shared/Register';
import NotFound from './pages/shared/NotFound';

// User Pages
import Collection from './pages/user/Collection';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import Item from './pages/user/Item';

// Admin Pages
import CollectionAdmin from './pages/admin/CollectionAdmin';
import EditProduct from './pages/admin/EditProduct';
import AddProduct from './pages/admin/AddProduct';

import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';

import 'swiper/css/bundle';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function ToggleMode() {
  const colorMode = React.useContext(ColorModeContext);
  return <Switch onClick={colorMode.toggleColorMode} />;
}

const App = () => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());
  const [mode, setMode] = React.useState('light');

  const user = JSON.parse(localStorage.getItem('user')) || false;

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

  let routes;
  if (user.isAdmin) {
    routes = (
      <>
        <Route path='/' element={<Navigate to='/admin' />} />
        <Route path='/admin' element={<CollectionAdmin />} />
        <Route path='/admin/:itemId' element={<EditProduct />} />
        <Route path='/admin/add' element={<AddProduct />} />
        <Route path='/admin/add' element={<AddProduct />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/:itemId' element={<Item />} />
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
                {routes}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/404' element={<NotFound />} />
                <Route exact={true} path='*' element={<Navigate to='/404' />} />
              </Routes>
            </Container>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
