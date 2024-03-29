import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuth: false,
  isLoading : true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthTrue(state, action) {
      state.isAuth = true
      state.user = action.payload;
    },
    setAuthFalse(state) {
      state.isAuth = false;
      state.user = {};
    },
    setLoadingTrue(state){
      state.isLoading = true;
    },
    setLoadingFalse(state){
      state.isLoading = false;
    }
  },
});

export const { setAuthTrue,setAuthFalse,setLoadingTrue ,setLoadingFalse} = userSlice.actions;
export default userSlice.reducer;
