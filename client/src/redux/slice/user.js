import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userType: '',
    firstName: 'test',
    lastName: 'bajracharya',
    id: '',
  },
  reducers: {
    setUser: (state, { payload }) => {
      //   console.log('set user');
      //   console.log(payload);
      state = { ...payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
