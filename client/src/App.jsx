import "./App.css";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import JobPage from "./pages/JobPage";
import JobSearch from "./pages/JobSearch";
import ApplicationPage from "./pages/ApplicationPage";
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';
import React from "react";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job" element={<JobPage />} />
        <Route path="/search" element={<JobSearch />} />
        <Route path="/application" element={<ProtectedApplicationPage />} />
        {/* //  {isLoggedIn ? (
        //   <Route path='/application' element={<ApplicationPage />} />
        // ) : (
        //   <Route path="/login" element={<Login />} />
        // )}  */}
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedApplicationPage() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <ApplicationPage />;
  } else {
    return null; 
  }
}

export default App;
