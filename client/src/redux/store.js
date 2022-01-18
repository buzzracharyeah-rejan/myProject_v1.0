import { configureStore } from '@reduxjs/toolkit';
import propertySlice from './slice/property';
import modalSlice from './slice/modal';

export const store = configureStore({
  reducer: {
    property: propertySlice,
    modal: modalSlice,
  },
});
