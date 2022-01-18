import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    listProperties: (state, actions) => {
      state.properties = actions.payload;
    },
  },
});

export const { listProperties } = propertySlice.actions;

export default propertySlice.reducer;
