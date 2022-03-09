import { ShoppingCart, Delete } from '@mui/icons-material';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import {
  Button,
  Tooltip,
  IconButton,
  Badge,
  Divider,
  Typography,
  Grid,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import AirForce1 from '../../images/air-force-1.jpg';
import { Box, styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';

const Image = styled('img')({
  height: '50px',
  width: '50px',
  objectFit: 'cover',
  borderRadius: '5px',
});

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartItems);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const invisible = false;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const removeItemFromCart = (item) => {
    const newCartItem = cartItems.filter((clickedItem) => clickedItem !== item);
    dispatch(addToCart(newCartItem));
    localStorage.setItem('Item', JSON.stringify(newCartItem));
  };

  return (
    <div className='cart'>
      <div>
        <IconButton
          id='cart-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Tooltip title='Open cart'>
            <Badge
              badgeContent={cartItems?.length}
              color='primary'
              invisible={invisible}
            >
              <ShoppingCartTwoToneIcon />
            </Badge>
          </Tooltip>
        </IconButton>
        <Menu
          id='cart-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ paddingY: '15px' }}
        >
          <Box sx={{ width: '400px' }}>
            <Typography
              variant='h5'
              component='h4'
              sx={{ marginLeft: '15px', marginBottom: '5px' }}
            >
              Cart
            </Typography>
            <Divider />
            {cartItems && cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <MenuItem
                    onClick={handleClose}
                    sx={{ paddingY: '10px' }}
                    key={item.id}
                  >
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={2}>
                        <Image src={AirForce1} alt='' />
                      </Grid>
                      <Grid item xs={8} display='grid'>
                        <Typography variant='p'>{item.title}</Typography>
                        <Typography variant='p'>
                          ${item.price} x {item.amount} $
                          {(item.price * item.amount).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => removeItemFromCart(item)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
                <Box sx={{ paddingX: '15px', paddingBottom: '5px' }}>
                  <Button fullWidth variant='outlined'>
                    <Typography variant='p'>Checkout</Typography>
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ paddingX: '15px', paddingY: '25px' }}>
                <Typography
                  variant='h5'
                  component='p'
                  color='text.secondary'
                  textAlign='center'
                >
                  Yout cart is empty
                </Typography>
              </Box>
            )}
          </Box>
        </Menu>
      </div>
    </div>
  );
};

export default Cart;
