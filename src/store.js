
import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slices/user';
const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
