import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '../../components/UI/Slider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '../../components/UI/Accordion';
import Select from '../../components/UI/Select';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, reset } from '../../features/items/itemSlice';

import AirForce1 from '../../images/air-force-1.jpg';
import AirMax from '../../images/air max.jpg';
import Future from '../../images/back from the future.jpg';
import Adapt from '../../images/adapt.jpg';
import AirForce1v2 from '../../images/air-force-1v2.png';
import AirForce1v3 from '../../images/air-force-1v3.jpg';
import AirForce1v4 from '../../images/air-force-1v4.jpg';
import { useEffect } from 'react';
import { useState } from 'react';

const DUMMY_ITEMS = [
  {
    id: 1,
    manufacturer: 'Nike',
    name: 'Air Force 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [AirForce1, AirForce1v2, AirForce1v3, AirForce1v4],
    price: 100,
  },
  {
    id: 2,
    manufacturer: 'Nike',
    name: 'Air Max',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [AirMax],
    price: 120,
  },
  {
    id: 3,
    manufacturer: 'Nike',
    name: 'Back From The Future',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [Future],
    price: 2000,
  },
  {
    id: 4,
    manufacturer: 'Nike',
    name: 'Adaot',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [Adapt],
    price: 80,
  },
];

const Collection = () => {
  //GOAL ITEM NEMAMO POSEBNO NAPRAVLJEN HOOK (PRODUCT ITEM RECIMO) za sada ga stavljam u products state i pravimo item po tome

  //ERROR : PROBLEM JE VRVT API_URL U itemService.js...
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    // const getProducts = async () => {
    //   const res = await fetch('http://localhost:5000/api/items');

    //   const data = await res.json();

    //   setProducts(data);
    // };
    // getProducts();

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    const newItems = dispatch(getItems());
    console.log(newItems);

    setProducts(newItems);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

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
          <Typography variant='h4' component='h2' color='text.primary'>
            Men's Sneakers
          </Typography>
          <Select />
        </Box>
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item xs={3} key={Math.random()}>
              <Card>
                <Link to={`/${item._id}`}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={AirForce1}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.description}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {item.price}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <Button size='small'>Add To Cart</Button>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {DUMMY_ITEMS.map((item) => (
            <Grid item xs={3} key={Math.random()}>
              <Card>
                <Link to={`/${item.id}`}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={item.images[0]}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {item.description}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {item.price}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <Button size='small'>Add To Cart</Button>
                  <Button size='small'>Learn More</Button>
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
