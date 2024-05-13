import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { addApplication } from "../store/applicationSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function ApplicationPage() {
  const location = useLocation();
  const {jobId,title} = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    details: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    formData.jobId = jobId;
    console.log(formData);
    dispatch(addApplication(formData)).then((res) => {
      console.log(res);
      if (res.payload) {
        alert("Application added successfully");

        navigate("/");
      }
      else{
        alert("Application already submitted....")
      }
    });
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="ApplicationContainer">
        <h1>Apply here for {title}</h1>
        <div className="ApplicationContainer__form">
          <form onSubmit={handleSubmit}>
            <div className="ApplicationContainer__form__input">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="description"
                name="details"
                value={formData.details}
                placeholder="Description"
                onChange={handleChange}
                required
              />
              <input type="file" className="file" value={formData.cv} />
            </div>
            <button className="LogoutButton">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
