import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
    <Box
      sx={{
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};
export default Spinner;
