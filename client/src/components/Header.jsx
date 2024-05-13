import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/UserSlice";
import { FcOrganization } from "react-icons/fc";
import { searchJob } from "../store/SearchSlice";

function Header() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTerm,setSearchTerm] = useState("");
  const [location,setLocation] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
        if (data) {
      dispatch({ type: "user/setLoggedIn", payload: true });
      if (data.isProvider !== undefined && data.isProvider) {
        dispatch({ type: "user/setRole", payload: "provider" });
      } else {
        dispatch({ type: "user/setRole", payload: "seeker" });
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("data");
    dispatch(logout);
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = {};
    if (searchTerm) queryParams.title = searchTerm;
    if (location) queryParams.location = location;
  

    const queryString = new URLSearchParams(queryParams).toString();

    navigate(`/search?${queryString}`);
    if(queryString){
      dispatch(searchJob(queryString))
    }


  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <div className="navbar">
        <div className="navCont">
          <Link className="logo-link" to="/">
            <h2 className="log">
              <FcOrganization />
              JobNest
            </h2>
          </Link>

          <div className="searchBar">
            <input
              type="text"
              placeholder="Search for title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
             <input
              type="text"
              placeholder="Search for location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {isLoggedIn ? (
            <button className="LogoutButton" onClick={handleLogout}>
              {" "}
              Log Out
            </button>
          ) : (
            <Link to="/login">
              {" "}
              <button className="LoginButton">Log In</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
