import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const userSignin = createAsyncThunk(
    'user/SigninUser',
    async(formData) => {
        const request = await axios.post("https://api-for-job-seeking-app.onrender.com/api/auth/register/",formData)
        const response = await request.data;
        return response;
    }
)
export const userLogin = createAsyncThunk(
    'user/loginUser',
    async(formData) => {
        const request = await axios.post("https://api-for-job-seeking-app.onrender.com/api/auth/",formData)
        const response = await request.data.data;
        localStorage.setItem('data',JSON.stringify(response));
       

        return response;

    }

)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        localStorage.removeItem('data');


        return null;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn:false,
        loading:false,
        user:null,
        error:null,
        role:null
    },
    reducers:{
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.user = null,
            state.error = null
            state.isLoggedIn = false;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = true;
        },)
        .addCase(userLogin.rejected, (state, action) => {
            state.user = null;
            state.loading = false;
            state.isLoggedIn = false;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Invalid Credentials';
            }
            else{
                state.error = action.error.message;
            }
           
        },)
        .addCase(userSignin.pending, (state) => {
            state.loading = true;
            state.user = null,
            state.error = null
        })
    
        .addCase(userSignin.fulfilled, (state, action) => {
            state.user = action.payload.user.isProvider;
            
            state.loading = false;
            state.error = null;
        },)
        .addCase(userSignin.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if(action.error.message === 'Request failed with status code 401'){
                    state.error = 'Unable to sign in try again.......';
                }
                if(action.error.message === 'Request failed with status code 403'){
                    state.error = 'Unable to sign in try again.......';
                }
                else{
                    state.error = action.error.message;
                }
            },)
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('token'); 
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                    loading: false,
                    error: null,
                    role:null
                };
            })
            
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default userSlice.reducer;
