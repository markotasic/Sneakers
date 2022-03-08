import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Paper, Grid, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

import Clear from '@mui/icons-material/Clear';

import { useDispatch } from 'react-redux';
import { createItem } from '../../features/items/itemSlice';

import image1 from '../../images/adapt.jpg';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  manufacturer: yup
    .string('Enter the manufacturer')
    .required('Manufacturer is required'),
  title: yup
    .string('Enter your title')
    .min(4, 'Title should be of minimum 4 characters length')
    .max(50, 'Title should not be over 50 characters')
    .required('Title is required'),
  description: yup
    .string('Enter your description')
    .min(20, 'Description should be of minimum 20 characters length')
    .max(250, 'Description should not be over 250 characters')
    .required('Description is required'),
  price: yup
    .number()
    .min(10, 'The price should not be less than 10$')
    .required('Price is required'),
});

const Image = styled('img')({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '5px',
});

const ImageContainer = styled(Paper)({
  padding: '7.5px',
  justifyItems: 'end',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const ClearBtn = styled(Button)({
  minWidth: '20px',
  marginBottom: '5px',
  height: '20px',
});

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      manufacturer: '',
      title: '',
      description: '',
      price: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createItem(values));
      navigate('/');
    },
  });

  const inputHandler = (event) => {
    console.log(event);
  };
  return (
    <Box marginTop={3}>
      <form onSubmit={formik.handleSubmit}>
        <Paper sx={{ display: 'grid' }} elevation={5}>
          <FormControl sx={{ m: 2 }}>
            <TextField
              id='manufacturer'
              name='manufacturer'
              label='Manufacturer *'
              type='text'
              value={formik.values.manufacturer}
              onChange={formik.handleChange}
              error={
                formik.touched.manufacturer &&
                Boolean(formik.errors.manufacturer)
              }
              helperText={
                formik.touched.manufacturer && formik.errors.manufacturer
              }
            />
          </FormControl>
          <FormControl sx={{ m: 2 }}>
            <TextField
              id='title'
              name='title'
              label='Title *'
              type='text'
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </FormControl>
          <FormControl sx={{ m: 2 }}>
            <TextField
              id='description'
              name='description'
              label='Description *'
              multiline
              rows={3}
              type='text'
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </FormControl>
          <FormControl sx={{ m: 2 }}>
            <TextField
              id='price'
              name='price'
              label='Price *'
              type='number'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 2 }}>
            <ImageUpload />
          </FormControl>
          <Button sx={{ m: 2 }} variant='contained' type='submit'>
            Add
          </Button>
        </Paper>
      </form>
    </Box>
  );
};

export default AddProduct;
