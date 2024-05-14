import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getProfile = createAsyncThunk('profile/getProfile',
    async(id) => {
    const data = localStorage.getItem('data');  
    const token = JSON.parse(data).token;
    id = JSON.parse(data).userId
    
    const headers = {
      token: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
        // const request = await axios.get(`http://localhost:8000/api/profile/${id}`,{headers});
        const request = await axios.get(`https://api-for-job-seeking-app.onrender.com/api/profile/${id}`,{headers});
        const response =request.data;
        
        return response;
    }
)

export const editProfile = createAsyncThunk('profile/editProfile',
    async(formData) => {
    const data = localStorage.getItem('data');  
    const token = JSON.parse(data).token;
    
    id = JSON.parse(data).userId

    const headers = {
        token:`Bearer ${token}`,
        'Content-Type': 'application/json'
    };
        // const request = await axios.patch(`http://localhost:8000/api/profile/${id}`,formData,{headers});
        const request = await axios.patch(`https://api-for-job-seeking-app.onrender.com/api/profile/${id}`,formData,{headers});
        const response =request.data;
        return response;
    }
)

export const postProfile = createAsyncThunk('profile/postProfile',
    async(profile) => {
    const data = localStorage.getItem('data');  
    profile.userId = JSON.parse(data).userId
    console.log(profile.userId)
    const token = JSON.parse(data).token;
    console.log(token)
    const headers = {
      token: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
        // const request = await axios.post('http://localhost:8000/api/profile', profile,{ headers });
        const request = await axios.post('https://api-for-job-seeking-app.onrender.com/api/profile', profile,{ headers });
        const response = request.data;
        return response;
    }
)

const initialState = {
    loading: false,
    data:[],
    error: ''
}

const profileSlice = createSlice(
    {
        name:'profile',
        initialState,

        reducers:{},
        extraReducers: (builder) => {
            builder
            .addCase(postProfile.pending,(state,action)=>{
                state.loading = true;

            })
            .addCase(postProfile.fulfilled,(state,action)=>{
                state.loading = false;
                state.data = action.payload.data;
                
                state.error = '';

            })
            .addCase(postProfile.rejected,(state,action)=>{
                state.loading = false;
                state.data = [];
                state.error = action.error.message;

            })
            .addCase(getProfile.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getProfile.fulfilled,(state,action)=>{
                state.loading = false;
                state.data = action.payload;
                state.error = '';
            })
            .addCase(getProfile.rejected,(state,action)=>{
                state.loading = false;
                state.data = [];
                state.error = action.error.message;
            })
            .addCase(editProfile.pending,(state,action) => {
                state.loading = true;
            })
            .addCase(editProfile.fulfilled,(state,action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.error = '';
            })
            .addCase(editProfile.rejected,(state,action) => {
                state.loading = false;
                state.data = [];
                state.error = action.error.message;
            })


        }


    }
)

export default profileSlice.reducer;