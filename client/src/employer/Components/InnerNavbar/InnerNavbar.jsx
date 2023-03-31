import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../../StateProvider/GlobalState";
import LoginModal from "../LoginModal";
import "./InnerNavbar.css";

import { AiOutlineUser, AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { CiPaperplane ,CiViewTimeline} from "react-icons/ci";
import { BsBriefcase } from "react-icons/bs";
import {  BiDetail } from "react-icons/bi";
import { TbFileInvoice , TbRecharging} from "react-icons/tb";
import { FiSettings , FiEdit } from "react-icons/fi";

const InnerNavbar = ({ openLogin, closeLogin, openRegister, closeRegister }) => {
  var path = window.location.pathname;
  let urlParts = path.split("/");
  const[activeTab , setActiveTab] = useState(urlParts[2]);
  
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
    <div className="Navbar">
      <div className="inner-bar">
        <ul className="list">
         
          <li
            className={`navbarlistItem  ${
              activeTab === "home" ? "active" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            <div className="navItemtoggle">
              <AiOutlineUser className="listItemIcon" />
              <span>
                {" "}
                <a href="/employer/home" className="text-decorate">
                  Home
                </a>
              </span>
            </div>
          </li>

          <li
            className={`navbarlistItem  ${
              activeTab === "posts" ? "active" : ""
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <div className="navItemtoggle">
              <CiViewTimeline className="listItemIcon" />
              <span>
                <a href="/employer/posts" className="text-decorate">
                  View Job Board
                </a>
              </span>
            </div>
          </li>

          <li
            className={`navbarlistItem  ${
              activeTab === "postJob" ? "active" : ""
            }`}
            onClick={() => setActiveTab("postJob")}
          >
            <div className="navItemtoggle">
              <CiPaperplane className="listItemIcon" />
              <a href="/employer/postJob" className="text-decorate">
                Post a Job
              </a>
            </div>
          </li>

          {isLoggedIn && (
            <>
              <li
                className={`navbarlistItem  ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <div className="navItemtoggle">
                  <BiDetail className="listItemIcon" />
                  <a href="/employer/details" className="text-decorate">
                    Details
                  </a>
                </div>
              </li>
              <li
                className={`navbarlistItem  ${
                  activeTab === "edit" ? "active" : ""
                }`}
                onClick={() => setActiveTab("edit")}
              >
                <div className="navItemtoggle">
                  <FiEdit className="listItemIcon" />
                  <a href="/employer/edit" className="text-decorate">
                    Edit Details
                  </a>
                </div>
              </li>
              <li
                className={`navbarlistItem  ${
                  activeTab === "viewApplications" ? "active" : ""
                }`}
                onClick={() => setActiveTab("viewApplications")}
              >
                <div className="navItemtoggle">
                  <BsBriefcase className="listItemIcon" />
                  <a
                    href="/employer/viewApplications"
                    className="text-decorate"
                  >
                    Applications
                  </a>
                </div>
              </li>
              <li
                className={`navbarlistItem  ${
                  activeTab === "recharge" ? "active" : ""
                }`}
                onClick={() => setActiveTab("recharge")}
              >
                <div className="navItemtoggle">
                  <TbRecharging className="listItemIcon" />
                  <a href="/employer/recharge" className="text-decorate">
                    Recharge
                  </a>
                </div>
              </li>
              <li className="navbarlistItem">
                <div className="navItemtoggle">
                  <AiOutlineLogout className="listItemIcon" />
                  <span>
                    <a className="text-decorate" onClick={logoutUser} href="">
                      Log Out
                    </a>
                  </span>
                </div>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li
                className={`navbarlistItem  ${
                  activeTab === "postjob" ? "active" : ""
                }`}
                onClick={() => setActiveTab("postjob")}
              >
                <div className="navItemtoggle">
                  <TbFileInvoice className="listItemIcon" />

                  <span>
                    <a
                      className="text-decorate"
                      onClick={(e) => {
                        openLogin();
                      }}
                      // href="/employer/login"
                    >
                      Login
                    </a>
                  </span>
                </div>
              </li>

              <li
                className={`navbarlistItem  ${
                  activeTab === "setting" ? "active" : ""
                }`}
                onClick={() => setActiveTab("setting")}
              >
                <div className="navItemtoggle">
                  <FiSettings className="listItemIcon" />
                  <span>
                    {" "}
                    <a
                      className="text-decorate"
                      onClick={(e) => openRegister()}
                      // href="/employer/register"
                    >
                      Register
                    </a>
                  </span>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InnerNavbar;

{
  /* <div className="employer_navbar">
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

</div> */
}
