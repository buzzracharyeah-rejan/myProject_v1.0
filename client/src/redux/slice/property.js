import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  edit: false,
  del: false,
  error: false,
  message: '',
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, actions) => {
      state.properties = actions.payload;
    },
    setEditFlag: (state, { payload }) => {
      state = { ...state, ...payload };
    },
    setDeleteFlag: (state, { payload }) => {
      state = { ...state, ...payload };
    },
  },
});

export const { setProperties, setEditFlag, setDeleteFlag } = propertySlice.actions;

export default propertySlice.reducer;
