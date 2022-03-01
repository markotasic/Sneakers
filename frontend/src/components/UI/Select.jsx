import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [sortBy, setSortBy] = React.useState('');

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sortBy}
          label='Sort By'
          onChange={handleChange}
        >
          <MenuItem value={'ascending'}>Price Ascending</MenuItem>
          <MenuItem value={'descending'}>Price Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
