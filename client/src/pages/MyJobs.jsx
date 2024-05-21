import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { FcEngineering } from "react-icons/fc";
import { deleteJob, getJobForProvider } from "../store/JobSlice";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const { data: jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (job) => {
    navigate('/editJob',{ state: { job: { ...job } } });
  }

  const handleDelete = (jobId) => {
    dispatch(deleteJob(jobId))
      .then((res) => {
        if (res.payload) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Failed to delete job:", err);
      });
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    const id = JSON.parse(data).userId;
    console.log(id);
    dispatch(getJobForProvider(id));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="JobDiscripPage">
        <div className="job-content">
          <div className="jobPosts">
            <h1>My Jobs</h1>
            {loading ? (
              <div>Loading Please Wait...</div>
            ) : error ? (
              <div>Error: {error.message || "Failed to fetch jobs"}</div>
            ) : jobs && jobs.length > 0 ? (
              <div className="job-tab">
                <ul className="ul-job">
                  {jobs.map((job) => (
                    <li key={job._id}>
                      <h2>
                        <FcEngineering /> {job.title}
                      </h2>
                      <p>Company: {job.companyName}</p>
                      <p>Location: {job.location}</p>
                      <p>Vacancy: {job.vacancy}</p>
                      <button onClick={() => handleDelete(job._id)} className="delbutton">
                        <MdDelete />
                      </button>
                      <button onClick={()=>{handleEdit(job)}} className="delbutton">
                        <RiEditBoxLine />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>No jobs found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyJobs;
