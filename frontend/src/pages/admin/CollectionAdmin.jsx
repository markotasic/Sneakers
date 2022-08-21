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
import { deleteItem, getItems, reset } from '../../features/items/itemSlice';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';

import AirForce1 from '../../images/air-force-1.jpg';
import Spinner from '../../components/UI/Spinner';
import filters from '../../filters/filters.json';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';

const Collection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.items);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState([]);
  const [categoryQuery, setCategoryQuery] = useState([]);
  const [brandQuery, setBrandQuery] = useState([]);
  const [typeQuery, setTypeQuery] = useState([]);

  const params = {
    page,
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
  }, [navigate, sortOrder, categoryQuery, brandQuery, typeQuery, page]);

  // Get all items
  useEffect(() => {
    dispatch(getItems(`?${createSearchParams(params)}`));

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams, sortOrder]);

  const deleteProduct = async (event) => {
    const itemId = event.target.dataset.id;
    dispatch(deleteItem(itemId));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const changeValue = (event) => {
    setSortOrder(event.target.value);
  };

  // 3 TIMES REAPING THE SAME FUNCTION, NEED TO CLEAN IT UP
  const filterCategoryItems = (event) => {
    if (event.target.checked) {
      setCategoryQuery((oldQuery) => [
        ...oldQuery,
        event.target.value.toLowerCase(),
      ]);
      setPage(1);
    } else {
      setCategoryQuery(
        categoryQuery.filter(
          (item) => item !== event.target.value.toLowerCase()
        )
      );
      setPage(1);
    }
  };
  const filterBrandItems = (event) => {
    if (event.target.checked) {
      setBrandQuery((oldQuery) => [
        ...oldQuery,
        event.target.value.toLowerCase(),
      ]);
      setPage(1);
    } else {
      setBrandQuery(
        brandQuery.filter((item) => item !== event.target.value.toLowerCase())
      );
      setPage(1);
    }
  };
  const filterTypeItems = (event) => {
    if (event.target.checked) {
      setTypeQuery((oldQuery) => [
        ...oldQuery,
        event.target.value.toLowerCase(),
      ]);
      setPage(1);
    } else {
      setTypeQuery(
        typeQuery.filter((item) => item !== event.target.value.toLowerCase())
      );
      setPage(1);
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
          <Slider maxPrice={items.maxPrice} minPrice={items.minPrice} />
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
          <Box>
            <Typography variant='h4' component='h2' color='text.primary'>
              Manage Products
            </Typography>
            <Link to='/admin/add'>
              <Button variant='contained'>Add Product</Button>
            </Link>
          </Box>
          <Select value={sortOrder} changeValue={changeValue} />
        </Box>
        {isLoading && <Spinner />}
        <Grid container spacing={2}>
          {items.items &&
            items.items.map((item) => (
              <Grid item xs={3} key={Math.random()} id={item._id}>
                <Card>
                  <Link to={`/admin/${item._id}`}>
                    {!item.imagePaths[0] && (
                      <CardMedia
                        component='img'
                        height='140'
                        image={AirForce1}
                      />
                    )}

                    {item.imagePaths[0] && (
                      <CardMedia
                        component='img'
                        height='140'
                        image={`http://localhost:5000/${item.imagePaths[0]}`}
                        alt={item.title}
                      />
                    )}

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

        {items.total > 1 && (
          <Box
            m={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              count={items.total}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Collection;
