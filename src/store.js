import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from './tabsSlices.js';
import itemsReducer from './itemsReducer.js';
const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    items: itemsReducer
  },
});

export default store;
