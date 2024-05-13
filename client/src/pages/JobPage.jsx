import React, { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getJobById } from '../store/JobSlice';

function JobPage() {
    const location =useLocation();
    const id = location.state;
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const { data: jobs, loading, error } = useSelector((state) => state.jobs);
    
    useEffect(()=>{
        dispatch(getJobById(id))
    },[])
    const handleClick = () => {
      navigate('/application', { state: { jobId: jobId, title: title } });
    }
  return (
    <>
    <Header/>
    <Sidebar/>
    <div className='JobDiscripPage'>
    <div className='job-content'>
    {loading ? (
              <div>Loading....</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : jobs ? (

    <div className='job-card'>
      <h2>Job Title: {jobs.title}</h2>
  {console.log(jobs)}
      <p><b>Company Name:</b> {jobs.companyName}</p>
        <p><b>Location:</b> {jobs.location}</p>
        <p><b>Salary: </b>{jobs.salary}</p>
        <p><b>Number of posts:</b> {jobs.vacancy}</p>

        <p><b>Description:</b> {jobs.description}</p>
        <p><b>Skills Required: </b>
        {jobs.skillsRequired ? (
            <ul>
            {jobs.skillsRequired.map((skill, index) => (
                <li key={index}>{skill}</li>
            ))}
            </ul>
        ) : null}
        </p>
        <button onClick={handleClick} className='LogoutButton'>Apply</button>
          
    </div>
    ) : null}
    </div>
    
    </div>
    </>
  )
}

export default JobPage