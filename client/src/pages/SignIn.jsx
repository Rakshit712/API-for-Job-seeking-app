import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignin } from "../store/UserSlice";
import Header from "../components/Header";

function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    isProvider: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {loading,error} = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(userSignin(formData)).then((res) => {
      console.log(res);
      if (res.payload) {
        navigate("/login");
      }
    });
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <>
    <Header/>
      <div className="Form-container-register">
        <form className="Form-register" onSubmit={handleSubmit}>
          <h2 className="signup-heading">Sign Up</h2>

          <input
            className="sign-name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="sign-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="sign-username"
            type="text"
            name="userName"
            placeholder="Enter your username"
            value={FormData.userName}
            onChange={handleChange}
            required
          />

          <input
            className="sign-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className="sign-label">
            Are you a provider?
            <input
              className="sign-checked"
              type="checkbox"
              checked={formData.isProvider}
              name="isProvider"
              onChange={handleChange}
            />
          </label>

          <button className="sign-button">
            {loading ? "Loading..." : "SignIn"}
          </button>
        </form>

        {error && (
          <div className="alert" role="alert">
            {error}
          </div>
        )}
         
      </div>
    </>
  );
}

export default SignIn;
