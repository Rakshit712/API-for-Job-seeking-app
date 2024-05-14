import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const searchJob = createAsyncThunk('search/filterJobs',
async (query) => {
   console.log(query,"12552222");
    // const request = await axios.get(`http://localhost:8000/api/job/searchh?${query}`)
    const request = await axios.get(`https://api-for-job-seeking-app.onrender.com/api/job/searchh?${query}`)
    const response = await request.data;
    return response;
}
)


const initialState = {
    loading: false,
    data: [],
    error: ''
}

const SearchSlice = createSlice(
    {
        name: 'search',
        initialState,

        reducers: {

        },
        extraReducers: (builder) => {
            builder
              .addCase(searchJob.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(searchJob.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
              })
              .addCase(searchJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch jobs';
              });
          }
    }
)


export default SearchSlice.reducer;