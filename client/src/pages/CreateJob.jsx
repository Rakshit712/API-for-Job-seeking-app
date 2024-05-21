import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TextField from "@mui/material/TextField";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../store/JobSlice";
import { useNavigate } from "react-router-dom";


function CreateJob() {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const {loading ,error} = useSelector((state)=>state.jobs);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description:'',
        skillsRequired:'',
        salary:'',
        vacancy:'',
        companyName:''
      })

      const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
      }

      const handleSubmit = (e)=> {
        e.preventDefault()
        const data = localStorage.getItem('data');  
        formData.jobProviderId = JSON.parse(data).userId
        dispatch(addJob(formData)).then((res)=>{
            console.log(res)
            if(res.payload){
              navigate('/')
            }
          })

      }

  return (
    <>
      <Header />
      <Sidebar />

      <div className="create-job-component">
        <h1>Create Job Post</h1>
        <img
          className="image-job"
          src="https://img.freepik.com/premium-photo/blank-sign-empty-chair-hiring-new-job-vacancy-concept-d-rendering_601748-4880.jpg"
          alt="Job Post"
        />

        <hr />
        <div className="create-form">
          <form onSubmit={handleSubmit} className="form_job">
            <h2 className="label">Add Job Title</h2>
            <TextField
              id="outlined-basic"
              label="Add job title"
              variant="outlined"
              fullWidth
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              margin="normal"
            />

            <h2 className="label">Add Company Name</h2>
            <TextField
              id="outlined-basic"
              label="Add Company name"
              variant="outlined"
              fullWidth
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
              required
              margin="normal"
            />

            <h2 className="label">Add Job Location</h2>
            <TextField
              id="outlined-basic"
              label="Add Job Location"
              variant="outlined"
              fullWidth
              name='location'
              value={formData.location}
              onChange={handleChange}
              required
              margin="normal"
            />

            <h2 className="label">Add Job Description</h2>
            <TextField
              id="outlined-basic"
              label="Add Job description"
              variant="outlined"
              fullWidth
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              margin="normal"
            />

            <h2 className="label">Add Salary Range</h2>
            <TextField
              id="outlined-basic"
              label="Add Salary Range"
              variant="outlined"
              fullWidth
              name='salary'
              value={formData.salary}
              onChange={handleChange}
              required
              
              margin="normal"
            />

            <h2 className="label">Add Job Vacancy</h2>
            <TextField
              id="outlined-basic"
              label="Add Job Vacancy"
              variant="outlined"
              fullWidth
              name='vacancy'
              value={formData.vacancy}
              onChange={handleChange}
              required
              margin="normal"
            />

            <h2 className="label">Add Skills Required</h2>
            <TextField
              id="outlined-basic"
              label="Add Skills Required"
              variant="outlined"
              fullWidth
              name='skillsRequired'
              value={formData.skillsRequired}
              onChange={handleChange}
              required
              margin="normal"
            />

            <br />
            <button className='create-button'>{loading?'Loading...':'Create'}</button>
          </form>
          {error&& (
        <div className='alert'
        role='alert'>{error}

        </div>
      )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateJob;
