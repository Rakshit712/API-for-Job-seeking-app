import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const addApplication = createAsyncThunk('application/add',
    async (body) => {
        const data = localStorage.getItem('data');  
        const token = JSON.parse(data).token;
        
    
        const headers = {
            token:`Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        // const response = await axios.post(`http://localhost:8000/api/jobApplication`, body,{headers})
        const response = await axios.post(`https://api-for-job-seeking-app.onrender.com/api/jobApplication`, body,{headers})
        return response.data
    }

)

const initialState = {
    loading: false,
    data: [],
    error: ''
}


const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addApplication.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addApplication.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(addApplication.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }

})


export default applicationSlice.reducer;