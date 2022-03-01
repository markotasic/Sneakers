import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { Paper, Grid, Typography } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
    showPasswordConfirm: false,
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () => {
    setValues({
      ...values,
      showPasswordConfirm: !values.showPasswordConfirm,
    });
  };

  const handleMouseDownPasswordConfirm = (event) => {
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
              Register
            </Typography>
            <FormControl sx={{ m: 2 }}>
              <TextField
                id='name'
                name='name'
                variant='filled'
                label='Name'
                type='text'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </FormControl>
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
                type={values.showPassword ? 'text' : 'password'}
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 2 }}>
              <TextField
                id='passwordConfirm'
                name='passwordConfirm'
                variant='filled'
                label='Confirm Password'
                type={values.showPasswordConfirm ? 'text' : 'password'}
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                error={
                  formik.touched.passwordConfirm &&
                  Boolean(formik.errors.passwordConfirm)
                }
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                        edge='end'
                      >
                        {values.showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button sx={{ m: 2 }} variant='contained' type='submit'>
              Register
            </Button>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
