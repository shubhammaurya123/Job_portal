import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../StateProvider/GlobalState";
import LoginModal from "./LoginModal";


const Navbar = ({ openLogin, closeLogin, openRegister, closeRegister }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const employer = jwt_decode(token);
      if (!employer) {
        localStorage.removeItem("token");
        window.location.href = "/employer/login";
      } else {
        setIsLoggedIn(true);
      }
    } else {
      // console.log("Token not found!")
      setIsLoggedIn(false);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/employer/home";
  };

  return (
    <div className="employer_navbar">
      <div>
        <a href="/employer/home">Home</a>
      </div>
      <div className="nav_options">
        <a href="/employer/posts">View Job Board</a>
        <a href="/employer/postJob">Post a Job</a>
        {isLoggedIn && <a href="/employer/dashboard">Details</a>}
        {isLoggedIn && <a href="/employer/edit">Edit Details</a>}
        {isLoggedIn && <a href="/employer/viewApplications">Applications</a>}
        {isLoggedIn && <a href="/employer/recharge">Recharge</a>}
      </div>
      <div>
        {!isLoggedIn && (
          <a
            className="employerBTNLink-light"
            onClick={(e) => {
              openLogin();
            }}
            // href="/employer/login"
          >
            Login
          </a>
        )}
        {!isLoggedIn && (
          <a
            className="employerBTNLink"
            onClick={(e) => openRegister()}
            // href="/employer/register"
          >
            Register
          </a>
        )}

          {isLoggedIn && (
          <a className="employerBTNLink" onClick={logoutUser} href="">
            Log Out
          </a>
        )}
       
      </div>
      
    </div>
  );
};

export default Navbar;
