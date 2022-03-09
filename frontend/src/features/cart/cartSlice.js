import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const setCartItems = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setInitialCartItems: (state) => {
      const cart = JSON.parse(localStorage.getItem('Item'));
      if (!cart) return;
      state.cartItems = [...cart];
    },
  },
});

export const { addToCart, setInitialCartItems } = setCartItems.actions;

export default setCartItems.reducer;
