import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { editProfile, getProfile, postProfile } from "../store/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcHome } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcFeedback } from "react-icons/fc";
import { FcPhone } from "react-icons/fc";
import { FcOrganization } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcKindle } from "react-icons/fc";

function Profile() {
  const dispatch = useDispatch();
  const {
    data: profile,
    loading,
    error,
  } = useSelector((state) => state.profile);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    education: "",
    // skills: [],
    experience: "",
    bio: "",
    companyName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSkillsChange = (e) => {
  //   const skills = e.target.value.split(",").map((skill) => skill.trim());
  //   setformData({
  //     ...formData,
  //     skills: skills,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(profile.data);
    if (profile && profile.data && profile.data.length > 0) {
      dispatch(editProfile(formData));
    } else {
      dispatch(postProfile(formData));
    }
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile && profile.data && profile.data.length > 0) {
      setformData(profile.data[0]);
    }
  }, [profile]);

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>

      <div>Profile</div>
      <div className="profile-container">
        <h1>
          {" "}
          <FcBusinessman /> Profile
        </h1>
        <div className="profile-details">
          <form onSubmit={handleSubmit} className="profileInfo">
            <div className="form-group">
              <FcHome />
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Your address"
                value={formData.address}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FcBusinessman />
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FcFeedback />
              <label htmlFor="email">Alternate Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FcPhone />
              <label htmlFor="phone">Alternate Phone:</label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Your phone number"
                value={formData.phone}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FcReadingEbook />
              <label htmlFor="education">Education:</label>
              <input
                id="education"
                name="education"
                type="text"
                placeholder="Your education"
                value={formData.education}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FcOrganization />
              <label htmlFor="companyName">Company Name:</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <FcBullish />
              <label htmlFor="experience">Experience:</label>
              <input
                id="experience"
                name="experience"
                type="text"
                placeholder="Your experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <FcKindle />
              <label htmlFor="bio">Bio:</label>
              <input
                id="bio"
                name="bio"
                placeholder="Your bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="LogoutButton">
              {profile.length > 0 ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
