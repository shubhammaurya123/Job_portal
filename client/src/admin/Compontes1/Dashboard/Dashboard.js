import React, { useEffect, useState } from "react";
import DashboardCard from "../DashboardCard/DashboardCard";
import "./Dashboard.css";
import { BsBriefcase, BsBookmark } from "react-icons/bs";
import StudentcardItem from "../StudentCardItem/StudentCardItem";
function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="dashboard-text"> Dashboard Home!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <DashboardCard />
      <div className="chart-noti">
        <div className="chart-bar">
          <div className="profile-view">Your Profile Views</div>
          <select value="Select Job" className="dropdown">
            <option>Last 6 Month</option>
            <option>Last 12 Month</option>
            <option>Last 24 Month</option>
          </select>
        </div>
        <div className="notification-bar">
          <div className="notification-text">Notification</div>
          <div className="message">
            <span className="icon-style-massage">
              <BsBriefcase />
            </span>
            <div>
              <span className="name-style">Wade Warren </span>
              <span> applied for a job</span>
              <span className="post-style"> Web Developer</span>
            </div>
          </div>
          <div className="message">
            <span className="icon-style-massage">
              <BsBriefcase />
            </span>
            <div>
              <span className="name-style">Wade Warren </span>
              <span> applied for a job</span>
              <span className="post-style"> Web Developer</span>
            </div>
          </div>
          <div className="message">
            <span className="icon-style-massage">
              <BsBriefcase />
            </span>
            <div>
              <span className="name-style">Wade Warren </span>
              <span> applied for a job</span>
              <span className="post-style"> Web Developer</span>
            </div>
          </div>
          <div className="message">
            <span className="icon-style-massage">
              <BsBriefcase />
            </span>
            <div>
              <span className="name-style">Wade Warren </span>
              <span> applied for a job</span>
              <span className="post-style"> Web Developer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="studentItem">
        <div className="row">
          <span className="applicant">Recent Applicants</span>
        </div>

        <div className="studentAllcardItem">
          <StudentcardItem />
          <StudentcardItem />
        </div>
        <div className="studentAllcardItem">
          <StudentcardItem />
          <StudentcardItem />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
