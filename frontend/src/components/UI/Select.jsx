import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const value = props.value.length >= 1 ? props.value : '';
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          label='Sort By'
          onChange={props.changeValue}
        >
          <MenuItem value={'asc'}>Price Ascending</MenuItem>
          <MenuItem value={'desc'}>Price Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
