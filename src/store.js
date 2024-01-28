
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/user';
import jobReducer from './slices/job';

const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer,
  },
});

export default store;
