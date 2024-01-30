import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getJobapi} from '../services/jopApi'



export const fetchJobs = createAsyncThunk(
    'jobs/fetchAddress',
    async function (user_id) {
            const res = await getJobapi(user_id)
            return res;
    }
  );

  

const initialState = {
    jobs:[],
    status : "",
    error:""
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearJobs(state){
      state.jobs = []
    }
  },
  extraReducers : (builder)=>{
    builder.addCase(fetchJobs.pending,(state)=>{
        state.status = "loading"
    })
    .addCase(fetchJobs.fulfilled,(state,action)=>{
        state.jobs = action.payload
        state.status = "idle"
    })
    .addCase(fetchJobs.rejected,(state)=>{
        state.status = "error",
        state.error = "there was problem getting your jobs"
    })
  }
});


export default jobSlice.reducer;
export const {clearJobs} =  jobSlice.actions;
