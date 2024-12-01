import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'All', // Set the initial active tab to 'All'
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;
