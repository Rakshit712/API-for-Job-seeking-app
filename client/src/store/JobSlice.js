import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const updatejob = createAsyncThunk ('user/updateJob'
    , async({formData,jobId}) => {
        const data = localStorage.getItem('data');  
        const token = JSON.parse(data).token;
        console.log(jobId)
        const headers = {
          token: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        console.log(headers);
        // const request = await axios.patch(`http://localhost:8000/api/job/${jobId}`,formData,{headers})
        const request = await axios.patch(`https://api-for-job-seeking-app.onrender.com/api/job/${jobId}`,formData,{headers},)
        const response = await request.data;
        return response;
    }
)

export const deleteJob = createAsyncThunk ('user/deleteJob',
    async(jobId) => {
        const data = localStorage.getItem('data');  
        const token = JSON.parse(data).token;
        
        const headers = {
          token: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        console.log(headers);
        // const request = await axios.delete(`http://localhost:8000/api/job/${jobId}`,{headers})
        const request = await axios.delete(`https://api-for-job-seeking-app.onrender.com/api/job/${jobId}`,{headers})
        const response = await request.data;
        return response;
    }
)
export const getJobForProvider = createAsyncThunk('user/getJobs', 
    async(providerid) => {
        const data = localStorage.getItem('data');  
        const token = JSON.parse(data).token;
        
        const headers = {
          token: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        console.log(headers)
        // const request = await axios.get(`http://localhost:8000/api/job/MyJobs/${providerid}`,{headers})
        const request = await axios.get(`https://api-for-job-seeking-app.onrender.com/api/job/MyJobs/${providerid}`,{headers})
        const response = await request.data;
        return response;
    }

)

export const addJob = createAsyncThunk('user/addjob',

    async(formData) => {
    const data = localStorage.getItem('data');  
    const token = JSON.parse(data).token;
    console.log(token)
    const headers = {
      token: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
        // const request = await axios.post("http://localhost:8000/api/job",formData,{headers})
        const request = await axios.post("https://api-for-job-seeking-app.onrender.com/api/job",formData,{headers})
        const response = await request.data;
        return response;
    }
)


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
                .addCase(addJob.pending,(state,action) => {
                    state.loading = true

                })
                .addCase(addJob.fulfilled,(state,action) => {
                    state.loading = false
                    state.data = action.payload.data.job
                    state.error = ''
                })
                .addCase(addJob.rejected,(state,action) => {
                    state.loading = false
                    state.data = []
                    state.error = action.error.message
                })
                .addCase(getJobForProvider.pending,(state,action) => {
                    state.loading = true

                })
                .addCase(getJobForProvider.fulfilled,(state,action) => {
                    state.loading = false
                    state.data = action.payload.data
                    state.error = ''
                })
                .addCase(getJobForProvider.rejected,(state,action) => {
                    state.loading = false
                    state.data = []
                    state.error = action.error.message
                
                })
                .addCase(deleteJob.pending,(state,action) => {
                    state.loading = true
                })
                .addCase(deleteJob.fulfilled,(state,action) => {
                    state.loading = false
                    state.data = action.payload.data
                    
                })
                .addCase(deleteJob.rejected,(state,action) => {
                    state.loading = false
                    state.data = []
                    state.error = action.payload.message
                })
                .addCase(updatejob.pending,(state,action) => {
                    state.loading = true

                })
                .addCase(updatejob.fulfilled,(state,action) => {
                    state.loading = false
                    state.data = action.payload.data
                    state.error = ''
                })
                .addCase(updatejob.rejected,(state,error) => {
                    state.loading = false
                    state.data = []
                    state.error = error.message
                })


        }

    }
)

export default jobSlice.reducer;