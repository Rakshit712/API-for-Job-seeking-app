import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../store/JobSlice';
import { useNavigate } from 'react-router-dom';
import { SiAkamai, SiEsotericsoftware } from "react-icons/si";
import Footer from '../components/Footer';


function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleClick = (jobId) => {
    console.log("clicked")
    navigate('/job', { state: jobId });
  }

  return (
    <>
      <div className='home-container'>
        <Header />
        <Sidebar />
        <div className='content-container'>
        <div className='jobPage'>
          <div className='jobPosts'>
         
            <h1>Job Posts</h1>
            
            {loading ? (
              <div>Loading....</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : Array.isArray(jobs) ? ( 
              <div className='job-tab'>
                <ul className='ul-job'>
                  {jobs.map(job => (
                    <li key={job._id}>
                      <h2><SiAkamai />    {job.title}</h2>
                      <p>Company: {job.companyName}</p>
                      <p>Location: {job.location}</p>
                      <p>Vacancy: {job.vacancy}</p>
                      <button onClick={() => handleClick(job._id)} className='LogoutButton'>More Info..</button>
                    </li>
                  ))}
                </ul>                    
              </div>
            ) : null}
          </div>
        </div>
        </div>
      </div>
      
    </>
  );
}

export default Home;
