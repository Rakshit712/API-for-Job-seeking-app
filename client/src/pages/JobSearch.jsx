import React, { useEffect } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { searchJob } from '../store/SearchSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiAkamai, SiEsotericsoftware } from "react-icons/si";



function JobSearch() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');
    const { data: jobs, loading, error } = useSelector((state) => state.search);  
  
    useEffect(() => {
        
        if (searchTerm && typeof searchTerm === 'string') {
           
            dispatch(searchJob(searchTerm)); 
        } else if (searchTerm && typeof searchTerm === 'object') {
            
            const queryString = new URLSearchParams(searchTerm).toString();
            dispatch(searchJob(queryString));
        }
    }, [dispatch, searchTerm]);
  
   
    const handleClick =(e) => {
      navigate('/application', { state: { jobId: jobs._id, title: jobs.title } });

    }

  return (
    <>
      <div className='home-container'>
        <Header />
        <Sidebar />
        <div className='content-container'>
        <div className='jobPage'>
          <div className='jobPosts'>
         
            <h1>Search Results...</h1>
            
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
  )
}

export default JobSearch