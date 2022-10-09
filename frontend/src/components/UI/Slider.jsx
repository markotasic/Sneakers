import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';

export default function MinimumDistanceSlider({ minPrice, maxPrice, arg }) {
  const [value, setValue] = React.useState([0, 500]);

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 500}
        value={value}
        onChangeCommitted={() => console.log(minPrice, maxPrice)}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={minPrice}
        max={maxPrice}
      />
    </Box>
  );
}
