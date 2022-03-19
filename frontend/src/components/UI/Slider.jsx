import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function MinimumDistanceSlider(props) {
  const [value, setValue] = React.useState([props.minPrice, props.maxPrice]);

  const marks = [
    {
      value: value[0],
      label: `$${value[0] || 0}`,
    },
    {
      value: value[1],
      label: `$${value[1] || 0}`,
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        marks={marks}
        max={props.maxPrice}
        min={props.minPrice}
        valueLabelDisplay='auto'
      />
    </Box>
  );
}
