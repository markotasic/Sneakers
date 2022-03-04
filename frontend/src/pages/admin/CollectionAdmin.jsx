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
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getItems } from '../../features/items/itemSlice';

import AirForce1 from '../../images/air-force-1.jpg';
import AirMax from '../../images/air max.jpg';
import Future from '../../images/back from the future.jpg';
import Adapt from '../../images/adapt.jpg';
import AirForce1v2 from '../../images/air-force-1v2.png';
import AirForce1v3 from '../../images/air-force-1v3.jpg';
import AirForce1v4 from '../../images/air-force-1v4.jpg';
import { useEffect } from 'react';
import { useState } from 'react';

// const DUMMY_ITEMS = [
//   {
//     id: 1,
//     manufacturer: 'Nike',
//     name: 'Air Force 1',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
//     images: [AirForce1, AirForce1v2, AirForce1v3, AirForce1v4],
//     price: 100,
//   },
//   {
//     id: 2,
//     manufacturer: 'Nike',
//     name: 'Air Max',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
//     images: [AirMax],
//     price: 120,
//   },
//   {
//     id: 3,
//     manufacturer: 'Nike',
//     name: 'Back From The Future',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
//     images: [Future],
//     price: 2000,
//   },
//   {
//     id: 4,
//     manufacturer: 'Nike',
//     name: 'Adaot',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
//     images: [Adapt],
//     price: 80,
//   },
// ];

const Collection = () => {
  const dispatch = useDispatch();
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getItems());
  }, []);

  // const deleteProduct = async (event) => {
  //   console.log(event.target.dataset.id);
  //   dispatch(deleteItem(event.target.id));
  //   // const itemId = event.target.dataset.id;
  //   // await fetch(`http://localhost:5000/api/items/${itemId}`, {
  //   //   method: 'DELETE',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     Authorization: `Bearer ${user.token}`,
  //   //   },
  //   // });

  //   // // CHANGE WITH SOMETHING ELSE :)
  //   // setProducts(products.filter((item) => item._id !== itemId));
  // };

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
        <Grid container spacing={2}>
          {items.map((item) => (
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
                    // onClick={deleteProduct}
                    // data-id={item._id}
                    // id={item._id}
                    onClick={() => dispatch(deleteItem(item._id))}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {/* {DUMMY_ITEMS.map((item) => (
            <Grid item xs={3} key={Math.random()}>
              <Card>
                <Link to={`/admin/${item.id}`}>
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
                  <Link to={`/admin/${item.id}`}>
                    <Button size='small'>Edit</Button>
                  </Link>
                  <Button size='small'>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))} */}
        </Grid>
      </Container>
    </Box>
  );
};
export default Collection;
