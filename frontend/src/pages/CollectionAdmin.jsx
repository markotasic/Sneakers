import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '../components/UI/Slider';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Accordion from '../components/UI/Accordion';
import Select from '../components/UI/Select';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

import AirForce1 from '../images/air-force-1.jpg';
import AirMax from '../images/air max.jpg';
import Future from '../images/back from the future.jpg';
import Adapt from '../images/adapt.jpg';

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
];

const Collection = () => {
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
          {DUMMY_ITEMS.map((item) => (
            <Grid item xs={3} key={Math.random()}>
              <Card>
                <Link to={`/${item.id}`}>
                  <CardMedia
                    component='img'
                    height='140'
                    image={item.image}
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
                  <Button size='small'>Edit</Button>
                  <Button size='small'>Delete</Button>
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
