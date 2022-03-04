import { useParams } from 'react-router-dom';

import { Box, Button, Typography, Grid } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

import Carousel from '../../components/UI/Carousel/Carousel';

import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getOneItem } from '../../features/items/itemSlice';

const Item = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(getOneItem(itemId));
  }, [isError, message, dispatch, itemId]);

  return (
    <Fragment>
      <Box
        sx={{
          marginTop: '5vh',
          height: '80vh',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Carousel item={items} />

        <Grid item xs={5}>
          <Typography
            variant='h6'
            component='h4'
            color='primary'
            marginBottom={2}
          >
            {items.manufacturer}
          </Typography>
          <Typography
            variant='h2'
            component='h2'
            color='text.primary'
            marginBottom={5}
            fontWeight={500}
          >
            {items.title}
          </Typography>
          <Typography
            variant='h6'
            component='p'
            color='text.secondary'
            marginBottom={5}
          >
            {items.description}
          </Typography>
          <Typography
            variant='h4'
            component='p'
            color='text.primary'
            marginBottom={5}
            fontWeight={700}
          >
            ${items.price}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                marginRight: '20px',
                display: 'flex',
                bgcolor: '#eeeeee',
                width: 'max-content',
                alignItems: 'center',
                borderRadius: '15px',
              }}
            >
              <Button
                size='large'
                sx={{ paddingY: '20px', borderRadius: '15px' }}
              >
                <Remove />
              </Button>
              <Typography variant='h6' component='p' marginX={2}>
                4
              </Typography>
              <Button
                size='large'
                sx={{ paddingY: '20px', borderRadius: '15px' }}
              >
                <Add />
              </Button>
            </Box>
            <Button
              variant='outlined'
              size='large'
              sx={{
                paddingX: '70px',
                borderRadius: '15px',
                paddingY: '15px',
              }}
            >
              <ShoppingCart />
              <Typography variant='h6' component='p'>
                Add to cart
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Box>
    </Fragment>
  );
};
export default Item;
