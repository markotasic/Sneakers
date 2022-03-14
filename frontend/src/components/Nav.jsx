import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Cart from './Cart/Cart';

const ResponsiveAppBar = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const admin = user ? user.hasOwnProperty('isAdmin') : false;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position='static'
      color='transparent'
      elevation={0}
      sx={{ borderBottom: 2 }}
    >
      <Container maxWidth='xl' sx={{ bg: 'text.primary' }}>
        <Toolbar disableGutters>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Typography
              variant='h6'
              noWrap
              component='h1'
              sx={{
                color: 'text.primary',
                mr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              SNEAKERS
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            ></Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='h1'
            sx={{
              color: 'text.primary',
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            SNEAKERS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!admin && (
              <>
                <Link to={'/about'} style={{ textDecoration: 'none' }}>
                  <Typography margin={2} sx={{ color: 'text.primary' }}>
                    About
                  </Typography>
                </Link>
                <Link to={'/contact'} style={{ textDecoration: 'none' }}>
                  <Typography margin={2} sx={{ color: 'text.primary' }}>
                    Contact
                  </Typography>
                </Link>
              </>
            )}
          </Box>

          <Cart />
          {props.mode}

          {user && (
            <Link to='/' onClick={onLogout}>
              <Typography margin={2} sx={{ color: 'text.primary' }}>
                Logout
              </Typography>
            </Link>
          )}

          {!user && (
            <>
              <Link to='login' style={{ textDecoration: 'none' }}>
                <Typography margin={2} sx={{ color: 'text.primary' }}>
                  Login
                </Typography>
              </Link>
              <Link to='register' style={{ textDecoration: 'none' }}>
                <Typography margin={2} sx={{ color: 'text.primary' }}>
                  Register
                </Typography>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
