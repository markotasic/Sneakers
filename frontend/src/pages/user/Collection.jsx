/* eslint-disable no-unused-vars */
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

export const truncateString = (stringValue, checkValue) => {
  if (stringValue !== undefined && stringValue.length > checkValue)
    stringValue = stringValue.substr(0, checkValue - 2) + '...';

  return stringValue;
};

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

  // if (items.items?.length) items.items.map((item) => console.log(item.price));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, sortOrder, categoryQuery, brandQuery, typeQuery]);

  useEffect(() => {
    dispatch(getItems(`?${createSearchParams(params)}`));

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  //____________________________OUTSOURCE____________________//

  //_________________________________________________________//

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
          sx={{
            backgroundColor: 'transparent',
            padding: '20px',
          }}
        >
          <Typography component='h6'>Price</Typography>
          <Divider />
          <Slider
            arg={params}
            maxPrice={items.maxPrice}
            minPrice={items.minPrice}
          />
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
          {items.items &&
            items.items.map((item) => (
              <Grid item xs={3} key={item._id}>
                <Card sx={{ maxHeight: '300px', maxWidth: '276px' }}>
                  <Link to={`/item/${item._id}`}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={`http://localhost:5000/${item.imagePaths[0]}`}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h6' component='div'>
                        {/* {item.title.length > 20} */}
                        {truncateString(item.title, 20)}
                        {/* {item.title.substr(0, 20)} */}
                      </Typography>
                      <Typography variant='h5' component='div'>
                        {`$${item.price}`}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions>
                    <Button size='small'>Add To Cart</Button>
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
