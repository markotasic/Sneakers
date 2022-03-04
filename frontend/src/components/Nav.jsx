import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import luffy from '../luffy.jpg';

const ResponsiveAppBar = (props) => {
  const pages = ['About', 'Contact'];
  const settings = ['Profile', 'Account', 'Dashboard'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const logoutUser = async () => {
    await props.logout();
    navigate('/login');
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
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
            {pages.map((page) => (
              <Link
                to={page.toLocaleLowerCase()}
                key={page}
                style={{ textDecoration: 'none' }}
              >
                <Typography margin={2} sx={{ color: 'text.primary' }}>
                  {page}
                </Typography>
              </Link>
            ))}
          </Box>

          {props.mode}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Monkey D. Luffy' src={luffy} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={logoutUser}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>

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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
