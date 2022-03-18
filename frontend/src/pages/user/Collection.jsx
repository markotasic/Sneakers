import * as React from 'react';
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
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, reset } from '../../features/items/itemSlice';
import Spinner from '../../components/UI/Spinner';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';

import AirForce1 from '../../images/air-force-1.jpg';
import { useEffect, useState } from 'react';
import filters from '../../filters/filters.json';

const Collection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState([]);
  const [categoryQuery, setCategoryQuery] = useState([]);
  const [brandQuery, setBrandQuery] = useState([]);
  const [typeQuery, setTypeQuery] = useState([]);

  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );

  const params = {
    price: sortOrder,
    category: categoryQuery,
    brand: brandQuery,
    type: typeQuery,
  };

  useEffect(() => {
    navigate({
      pathname: '/',
      search: `?${createSearchParams(params)}`,
    });
  }, [navigate, sortOrder, categoryQuery, brandQuery, typeQuery]);

  useEffect(() => {
    dispatch(getItems(`?${createSearchParams(params)}`));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, searchParams, sortOrder]);

  const changeValue = (event) => {
    setSortOrder(event.target.value);
  };

  const filterCategoryItems = (event) => {
    if (event.target.checked) {
      setCategoryQuery((oldQuery) => [
        ...oldQuery,
        event.target.value.toLowerCase(),
      ]);
    } else {
      setCategoryQuery(
        categoryQuery.filter(
          (item) => item !== event.target.value.toLowerCase()
        )
      );
    }
  };
  const filterBrandItems = (event) => {
    if (event.target.checked) {
      setBrandQuery((oldQuery) => [
        ...oldQuery,
        event.target.value.toLowerCase(),
      ]);
    } else {
      setBrandQuery(
        brandQuery.filter((item) => item !== event.target.value.toLowerCase())
      );
    }
  };
  const filterTypeItems = (event) => {
    if (event.target.checked) {
      setTypeQuery((oldQuery) => [
        ...oldQuery,
        event.target.value.toLowerCase(),
      ]);
    } else {
      setTypeQuery(
        typeQuery.filter((item) => item !== event.target.value.toLowerCase())
      );
    }
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
        <Accordion
          filter={filters}
          filterCategoryItems={filterCategoryItems}
          filterTypeItems={filterTypeItems}
          filterBrandItems={filterBrandItems}
        />
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
          <Select value={sortOrder} changeValue={changeValue} />
        </Box>
        {isLoading && <Spinner />}
        <Grid container spacing={2}>
          {items[0] &&
            items.map((item) => (
              <Grid item xs={3} key={item._id}>
                <Card>
                  <Link to={`/item/${item._id}`}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={`http://localhost:5000/${item.imagePaths[0]}`}
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
                        {`$${item.price}`}
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
