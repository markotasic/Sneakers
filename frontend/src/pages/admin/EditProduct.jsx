import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Paper, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useState, useEffect } from 'react';
import { getOneItem } from '../../features/items/itemSlice';

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
    .min(10, 'The price should not be less than 10')
    .required('Price is required'),
});

const EditProduct = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState([]);

  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(getOneItem(itemId));
  }, [isError, message, dispatch, itemId]);

  console.log(items);
  const formik = useFormik({
    initialValues: {
      brand: '',
      title: items.title,
      description: '',
      price: 0,
      category: '',
      type: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // dispatch(updateItem(itemId));
      const postData = async () => {
        const config = {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(values),
        };

        await fetch(`http://localhost:5000/api/items/${itemId}/edit`, config);

        navigate('/');
      };

      postData();
    },
  });

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

  return (
    <Box marginTop={3}>
      {items && (
        <form onSubmit={formik.handleSubmit}>
          <Paper sx={{ display: 'grid' }} elevation={5}>
            <FormControl sx={{ m: 2 }}>
              <InputLabel
                id='brand'
                error={
                  formik.touched.brand && formik.errors.brand ? true : false
                }
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
                <MenuItem value={'nike'}>Nike</MenuItem>
                <MenuItem value={'adidas'}>Adidas</MenuItem>
                <MenuItem value={'converse'}>Converse</MenuItem>
                <MenuItem value={'reebok'}>Reebok</MenuItem>
                <MenuItem value={'new balance'}>New Balance</MenuItem>
                <MenuItem value={'vans'}>Vans</MenuItem>
                <MenuItem value={'puma'}>Puma</MenuItem>
                <MenuItem value={'jordan'}>Jordan</MenuItem>
                <MenuItem value={'yeezy'}>Yeezy</MenuItem>
                <MenuItem value={'asics'}>Asics</MenuItem>
              </Select>
              {formik.touched.brand && (
                <FormHelperText error>{formik.errors.brand}</FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ m: 2 }}>
              <InputLabel
                id='category'
                error={
                  formik.touched.category && formik.errors.category
                    ? true
                    : false
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
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
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
                <MenuItem value={'lifestyle'}>Lifestyle</MenuItem>
                <MenuItem value={'running'}>Running</MenuItem>
                <MenuItem value={'training & gym'}>Training & Gym</MenuItem>
                <MenuItem value={'basketball'}>Basketball</MenuItem>
                <MenuItem value={'soccer'}>Soccer</MenuItem>
                <MenuItem value={'tennis'}>Tennis</MenuItem>
                <MenuItem value={'track & field'}>Track & Field</MenuItem>
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
              <ImageUpload
                pickedHandler={pickedHandler}
                previewUrl={previewUrl}
                removeImages={removeImages}
              />
            </FormControl>
            <Button sx={{ m: 2 }} variant='contained' type='submit'>
              Update
            </Button>
          </Paper>
        </form>
      )}
    </Box>
  );
};

export default EditProduct;
