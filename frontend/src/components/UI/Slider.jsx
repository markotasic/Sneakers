import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import { createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItems } from '../../features/items/itemSlice';

export default function MinimumDistanceSlider({ minPrice, maxPrice }) {
  const [value, setValue] = React.useState([0, 500]);

  const dispatch = useDispatch();

  const params = {
    minPrice: value[0],
    maxPrice: value[1],
  };

  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFilteredValueItems = () => {
    dispatch(getItems(`?${createSearchParams(params)}`));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 500}
        value={value}
        onChangeCommitted={getFilteredValueItems}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={minPrice}
        max={maxPrice}
      />
    </Box>
  );
}
