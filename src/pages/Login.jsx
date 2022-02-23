import { TextField, Box } from '@mui/material';

const Login = () => {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField id='filled-basic' label='E-Mail' variant='filled' />
      <TextField id='filled-basic' label='Password' variant='filled' />
    </Box>
  );
};
export default Login;
