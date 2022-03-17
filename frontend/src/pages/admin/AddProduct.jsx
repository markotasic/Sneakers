import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Paper, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { useDispatch } from 'react-redux';
import { createItem } from '../../features/items/itemSlice';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from 'react';
import axios from 'axios';

const validationSchema = yup.object({
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  type: yup.string().required('Type is required'),
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

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [previewUrl, setPreviewUrl] = useState([]);

  const uploadImages = async () => {
    console.log('UploadImages fired up!');
    await axios.post(
      'http://localhost:5000/api/items/add/uploadImages',
      previewUrl
    );
  };

  const pickedHandler = (e) => {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl((oldUrl) => [...oldUrl, reader.result]);
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  };

  const removeImages = (imageId) => {
    setPreviewUrl(previewUrl.filter((name) => name !== imageId));
  };

  const formik = useFormik({
    initialValues: {
      brand: ''.toLocaleLowerCase(),
      title: '',
      description: ''.toLocaleLowerCase(),
      price: +'',
      category: ''.toLocaleLowerCase(),
      type: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createItem(values));
      navigate('/');
      console.log('Submit fired up');
      uploadImages();
      return;
    },
  });

  // Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, repudiandae.
  return (
    <Box marginTop={3}>
      <form onSubmit={formik.handleSubmit}>
        <Paper sx={{ display: 'grid' }} elevation={5}>
          <FormControl sx={{ m: 2 }}>
            <InputLabel
              id='brand'
              error={formik.touched.brand && formik.errors.brand ? true : false}
            >
              Brand *
            </InputLabel>
            <Select
              id='brand'
              name='brand'
              label='Brand *'
              type='text'
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
            >
              <MenuItem value={'Nike'}>Nike</MenuItem>
              <MenuItem value={'Adidas'}>Adidas</MenuItem>
              <MenuItem value={'Converse'}>Converse</MenuItem>
              <MenuItem value={'Reebok'}>Reebok</MenuItem>
              <MenuItem value={'New Balance'}>New Balance</MenuItem>
              <MenuItem value={'Vans'}>Vans</MenuItem>
              <MenuItem value={'Puma'}>Puma</MenuItem>
              <MenuItem value={'Jordan'}>Jordan</MenuItem>
              <MenuItem value={'Yeezy'}>Yeezy</MenuItem>
              <MenuItem value={'Asics'}>Asics</MenuItem>
            </Select>
            {formik.touched.brand && (
              <FormHelperText error>{formik.errors.brand}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 2 }}>
            <InputLabel
              id='category'
              error={
                formik.touched.category && formik.errors.category ? true : false
              }
            >
              Category *
            </InputLabel>
            <Select
              id='category'
              name='category'
              label='Category *'
              type='text'
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <MenuItem value={'men'}>Men</MenuItem>
              <MenuItem value={'women'}>Women</MenuItem>
              <MenuItem value={'kids'}>Kids</MenuItem>
            </Select>
            {formik.touched.category && (
              <FormHelperText error>{formik.errors.category}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ m: 2 }}>
            <InputLabel
              id='type'
              error={formik.touched.type && formik.errors.type ? true : false}
            >
              Type *
            </InputLabel>
            <Select
              id='type'
              name='type'
              label='type *'
              type='text'
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <MenuItem value={'Lifestyle'}>Lifestyle</MenuItem>
              <MenuItem value={'Running'}>Running</MenuItem>
              <MenuItem value={'Training & Gym'}>Training & Gym</MenuItem>
              <MenuItem value={'Basketball'}>Basketball</MenuItem>
              <MenuItem value={'Soccer'}>Soccer</MenuItem>
              <MenuItem value={'Tennis'}>Tennis</MenuItem>
              <MenuItem value={'Track & Field'}>Track & Field</MenuItem>
            </Select>
            {formik.touched.type && (
              <FormHelperText error>{formik.errors.type}</FormHelperText>
            )}
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
              value={+formik.values.price}
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
            <ImageUpload
              pickedHandler={pickedHandler}
              previewUrl={previewUrl}
              removeImages={removeImages}
            />
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
