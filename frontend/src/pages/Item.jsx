import { useParams } from 'react-router-dom';

import AirForce1 from '../images/air-force-1.jpg';
import AirMax from '../images/air max.jpg';
import Future from '../images/back from the future.jpg';
import Adapt from '../images/adapt.jpg';
import Carousel from '../components/UI/Carousel/Carousel';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

const DUMMY_ITEMS = [
  {
    id: 1,
    name: 'Air Force 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirForce1,
    price: '$100',
  },
  {
    id: 2,
    name: 'Air Max',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirMax,
    price: '$120',
  },
  {
    id: 3,
    name: 'Back From The Future',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Future,
    price: '$2000',
  },
  {
    id: 4,
    name: 'Adaot',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Adapt,
    price: '$80',
  },
  {
    id: 5,
    name: 'Air Force 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirForce1,
    price: '$100',
  },
  {
    id: 6,
    name: 'Air Max',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirMax,
    price: '$120',
  },
  {
    id: 7,
    name: 'Back From The Future',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Future,
    price: '$2000',
  },
  {
    id: 8,
    name: 'Adaot',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Adapt,
    price: '$80',
  },
  {
    id: 9,
    name: 'Air Force 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirForce1,
    price: '$100',
  },
  {
    id: 10,
    name: 'Air Max',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirMax,
    price: '$120',
  },
  {
    id: 11,
    name: 'Back From The Future',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Future,
    price: '$2000',
  },
  {
    id: 12,
    name: 'Adaot',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Adapt,
    price: '$80',
  },
  {
    id: 13,
    name: 'Air Force 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirForce1,
    price: '$100',
  },
  {
    id: 14,
    name: 'Air Max',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: AirMax,
    price: '$120',
  },
  {
    id: 15,
    name: 'Back From The Future',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Future,
    price: '$2000',
  },
  {
    id: 16,
    name: 'Adaot',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    image: Adapt,
    price: '$80',
  },
];

const Item = () => {
  let { itemId } = useParams();
  const [item] = DUMMY_ITEMS.filter((item) => item.id === +itemId);
  return (
    <Box
      sx={{
        marginTop: '5vh',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Carousel />

      <Grid item xs={5}>
        <Typography variant='h6' component='h4' color='primary'>
          SNEAKERS COMPANY
        </Typography>
        <Typography variant='h2' component='h2' color='text.primary'>
          Fall Limited Sneakers
        </Typography>
        <Typography variant='p' component='p' color='text.secondary'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae natus
          voluptatibus ratione nihil ullam laudantium! Soluta velit at doloribus
          veritatis dolorum vel dignissimos excepturi pariatur? Officiis ipsa
          reprehenderit odio ex?
        </Typography>
        <Typography variant='h4' component='p' color='text.primary'>
          $200.00
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
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
              <Add />
            </Button>
            <Typography variant='h6' component='p' marginX={2}>
              4
            </Typography>
            <Button
              size='large'
              sx={{ paddingY: '20px', borderRadius: '15px' }}
            >
              <Remove />
            </Button>
          </Box>
          <Button
            variant='contained'
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
