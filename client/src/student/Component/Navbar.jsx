import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../controllers/auth";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("Guest");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    const curLocation = location.pathname;
    navigate("/student/login", { state: {from:curLocation} });
  };

  const loginNavigation = () => {
    const curLocation = location.pathname;
    navigate("/student/login", { state:{from: curLocation} });
  };

  const [tokenData, isTokenExpired, isLogin] = useAuth();

  useEffect(() => {
    setUserName(tokenData?.name ? tokenData.name : "Guest");
  }, [tokenData, isLogin, location]);

 

  const navHandler = () => {
    if (isLogin) {
      window.location.href = "/student/user_profile";
    } else {
      window.location.href = "/student/register";
    }
  };

  return (
    <div className="navbar" style={{ backgroundColor: "#ccc9c9" }}>
      <ul style={{ listStyle: "none", display: "flex" }}>
        <li>
          <Link to="/student/home" style={{ margin: "10px" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/student/register" style={{ margin: "10px" }}>
            Register
          </Link>
        </li>
        <li>
          <Link to="/student/profile" style={{ margin: "10px" }}>
            Record Your Profile
          </Link>
        </li>
        <li>
          <Link to="/student/job" style={{ margin: "10px" }}>
            Jobs
          </Link>
        </li>
        {localStorage.getItem("token") ? (
          <li>
            <p
              onClick={logoutHandler}
              style={{
                marginLeft: "10px",
                marginTop: "0",
                color: "#663393",
                cursor: "pointer",
              }}
            >
              Logout
            </p>
          </li>
        ) : null}
        {localStorage.getItem("token") ? null : (
          <li>
            <p
              onClick={loginNavigation}
              style={{
                marginLeft: "10px",
                marginTop: "0",
                color: "#663393",
                cursor: "pointer",
              }}
            >
              Login
            </p>
          </li>
        )}
      </ul>
      <div onClick={navHandler} className="username-cn">
        {userName}
      </div>
    </div>
  );
};

export default Navbar;
