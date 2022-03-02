import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { Paper, Grid, Typography } from '@mui/material';
import { login, reset } from '../features/auth/authSlice';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
      return;
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (loginValues) => {
      dispatch(login(loginValues));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      mt={'20vh'}
    >
      <Grid>
        <form onSubmit={formik.handleSubmit}>
          <Paper sx={{ display: 'grid', minWidth: 400 }} elevation={5}>
            <Typography margin={2} variant='h4' component='h2'>
              Login
            </Typography>

            {isError && (
              <Typography margin={2} variant='h4' component='h5'>
                {message}
              </Typography>
            )}

            <FormControl sx={{ m: 2 }}>
              <TextField
                id='email'
                name='email'
                variant='filled'
                label='Email'
                type='text'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
            <FormControl sx={{ m: 2 }}>
              <TextField
                id='password'
                name='password'
                variant='filled'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button sx={{ m: 2 }} variant='contained' type='submit'>
              Login
            </Button>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};
export default Login;
