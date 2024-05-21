import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { updatejob } from '../store/JobSlice';


function EditJob() {
  const dispatch = useDispatch();
  const [jobId,setjobId] = useState("")
  const location = useLocation();
  const { job } = location.state;
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    skillsRequired: '',
    salary: '',
    vacancy: '',
    companyName: ''
  });
  
  useEffect(() => {
    if (job) {
        setjobId(job._id);
      setFormData({
        
        title: job.title,
        location: job.location,
        description: job.description,
        skillsRequired: job.skillsRequired,
        salary: job.salary,
        vacancy: job.vacancy,
        companyName: job.companyName
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(jobId)
    dispatch(updatejob({formData,jobId})).then((res) => {

      if (res.payload) {
        navigate('/myjobs');
      }
    }).catch((err) => {
      console.error("Failed to update job:", err);
    });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <div className="create-job-component">
        <h1>Edit your Job Post</h1>
        <hr />
        <div className="create-form">
          <form onSubmit={handleSubmit} className="form_job">
            <h2 className="label"> Job Title</h2>
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

            <h2 className="label">Company Name</h2>
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

            <h2 className="label">Job Location</h2>
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

            <h2 className="label">Job Description</h2>
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

            <h2 className="label"> Salary Range</h2>
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

            <h2 className="label" Job> Vacancy</h2>
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

            <h2 className="label"> Skills Required</h2>
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
            <button className='create-button'>Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditJob;
