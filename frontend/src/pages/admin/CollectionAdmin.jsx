import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Container,
} from '@mui/material';
import Slider from '../../components/UI/Slider';
import Accordion from '../../components/UI/Accordion';
import Select from '../../components/UI/Select';
import { deleteItem, getItems } from '../../features/items/itemSlice';

import AirForce1 from '../../images/air-force-1.jpg';
import Spinner from '../../components/UI/Spinner';

const Collection = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.items);

  // Get all items
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const deleteProduct = async (event) => {
    const itemId = event.target.dataset.id;
    dispatch(deleteItem(itemId));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '20px',
      }}
    >
      <Grid
        container
        direction='column'
        sx={{ marginRight: '20px', width: '300px' }}
      >
        <Paper
          variant='outlined'
          sx={{ backgroundColor: 'transparent', padding: '20px' }}
        >
          <Typography component='h6'>Price</Typography>
          <Divider />
          <Slider />
        </Paper>
        <Accordion name={'arg'} />
      </Grid>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant='h4' component='h2' color='text.primary'>
              Manage Products
            </Typography>
            <Link to='/admin/add'>
              <Button variant='contained'>Add Product</Button>
            </Link>
          </Box>
          <Select />
        </Box>
        {isLoading && <Spinner />}
        <Grid container spacing={2}>
          {items[0] &&
            items.map((item) => (
              <Grid item xs={3} key={Math.random()} id={item._id}>
                <Card>
                  <Link to={`/admin/${item._id}`}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={AirForce1}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {item.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {item.description}
                      </Typography>
                      <Typography variant='h5' component='div'>
                        ${item.price}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions>
                    <Link to={`/admin/${item._id}`}>
                      <Button size='small'>Edit</Button>
                    </Link>
                    <Button
                      size='small'
                      onClick={deleteProduct}
                      data-id={item._id}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Collection;
