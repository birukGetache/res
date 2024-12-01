import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: {}, // Set the initial active tab to 'All'
};

const itemsReducer = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.item = action.payload;
    },
  },
});

export const { setItems } = itemsReducer.actions;
export default itemsReducer.reducer;
