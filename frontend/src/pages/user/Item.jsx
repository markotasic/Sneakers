import { useParams } from 'react-router-dom';

import { Box, Button, Typography, Grid } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

import Carousel from '../../components/UI/Carousel/Carousel';

import AirForce1 from '../../images/air-force-1.jpg';
import AirMax from '../../images/air max.jpg';
import Future from '../../images/back from the future.jpg';
import Adapt from '../../images/adapt.jpg';
import AirForce1v2 from '../../images/air-force-1v2.png';
import AirForce1v3 from '../../images/air-force-1v3.jpg';
import AirForce1v4 from '../../images/air-force-1v4.jpg';
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

const Item = () => {
  let { itemId } = useParams();
  const [item] = DUMMY_ITEMS.filter((item) => item.id === +itemId);
  return (
    <Box
      sx={{
        marginTop: '5vh',
        height: '80vh',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Carousel item={item} />

      <Grid item xs={5}>
        <Typography
          variant='h6'
          component='h4'
          color='primary'
          marginBottom={2}
        >
          {item.manufacturer.toUpperCase()}
        </Typography>
        <Typography
          variant='h2'
          component='h2'
          color='text.primary'
          marginBottom={5}
          fontWeight={500}
        >
          {item.name}
        </Typography>
        <Typography
          variant='h6'
          component='p'
          color='text.secondary'
          marginBottom={5}
        >
          {item.description}
        </Typography>
        <Typography
          variant='h4'
          component='p'
          color='text.primary'
          marginBottom={5}
          fontWeight={700}
        >
          ${item.price.toFixed(2)}
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
            sx={{ paddingX: '70px', borderRadius: '15px', paddingY: '15px' }}
          >
            <ShoppingCart />
            <Typography variant='h6' component='p'>
              Add to cart
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
export default Item;
