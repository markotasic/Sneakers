import { useParams } from 'react-router-dom';

import { Box, Button, Typography, Grid } from '@mui/material';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

import Carousel from '../../components/UI/Carousel/Carousel';

import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { getOneItem } from '../../features/items/itemSlice';
import Spinner from '../../components/UI/Spinner';
import { addToCart } from '../../features/cart/cartSlice';

const Item = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);
  const [cardData, setCardData] = useState([]);

  const decrement = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };
  const increment = () => {
    if (amount >= 5) return;
    setAmount(amount + 1);
  };

  const storageItem = localStorage.getItem('Item');

  useEffect(() => {
    if (!storageItem) return;
    const parsedItem = JSON.parse(storageItem);

    setCardData(parsedItem);
  }, [storageItem]);

  const createItemInCart = (item) => {
    const index = cardData.findIndex((item) => item.id === itemId);
    if (index > -1) {
      setCardData((oldArray) => {
        const newArray = [...oldArray];
        newArray[index] = {
          ...newArray[index],
          amount: amount + oldArray[index].amount,
        };

        localStorage.setItem('Item', JSON.stringify(newArray));
        dispatch(addToCart(newArray));
        return newArray;
      });
      // dispatch(addToCart(cardData));
    } else {
      setCardData((oldArray) => {
        console.log(item._id);
        const newArray = [
          ...oldArray,
          {
            id: item._id,
            title: item.title,
            image: '',
            price: item.price,
            amount,
          },
        ];

        localStorage.setItem('Item', JSON.stringify(newArray));
        dispatch(addToCart(newArray));
        return newArray;
      });
      // dispatch(addToCart(cardData));
    }
  };

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
          {isLoading && <Spinner />}
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
                onClick={decrement}
              >
                <Remove />
              </Button>
              <Typography variant='h6' component='p' marginX={2}>
                {amount}
              </Typography>
              <Button
                size='large'
                sx={{ paddingY: '20px', borderRadius: '15px' }}
                onClick={increment}
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
              onClick={() => {
                createItemInCart(items);
              }}
            >
              <AddShoppingCartTwoToneIcon />
              <Typography variant='h6' component='p' marginLeft='20px'>
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
