import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getJobs = createAsyncThunk('user/fetchJobs',
    async () => {
        // const request = await axios.get("http://localhost:8000/api/job")
        const request = await axios.get("https://api-for-job-seeking-app.onrender.com/api/job")
        const response = await request.data;
        return response;
    }
)
export const getJobById = createAsyncThunk('users/fetchJobId',
    async (id) => {
        // const url = `http://localhost:8000/api/job/${id}`;
        const url = `https://api-for-job-seeking-app.onrender.com/api/job/${id}`;
        const request = await axios.get(url);
        const response = request.data;
        return response;

    }
)

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const jobSlice = createSlice(
    {
        name: 'jobs',
        initialState,

        reducers: {

        },
        extraReducers: (builder) => {
            builder
                .addCase(getJobs.pending, (state) => {
                    state.loading = true

                })
                .addCase(getJobs.fulfilled, (state, action) => {
                    state.loading = false
                    state.data = action.payload.data
                    state.error = ''
                })
                .addCase(getJobs.rejected, (state, action) => {
                    state.loading = false
                    state.data = []
                    state.error = action.error.message
                })
                .addCase(getJobById.pending, (state, action) => {
                    state.loading = true
                    state.data = []
                    state.error = ''

                })
                .addCase(getJobById.fulfilled, (state, action) => {
                    state.loading = false
                    state.data = action.payload.job
                    state.error = ''
                })
                .addCase(getJobById.rejected, (state, action) => {
                    state.loading = false
                    state.data = []
                    state.error = action.error.message
                })


        }

    }
)

export default jobSlice.reducer;