import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import "./EmpDashboard.css";

import { BsBriefcase, BsBookmark } from "react-icons/bs";
import Applications from "../Application/Applications";
import jwt_decode from "jwt-decode";
import EmpCardItem from "../Application/EmpCardItem";
import DashboardChart from "../../Components/DashboardChart/DashobardChart";
function EmpDashboard() {
  const token = localStorage.getItem("token");
  const employer = jwt_decode(token);
  const [data, setData] = useState([]);
  const [size, setSize] = useState();
  const [jobId, setJobId] = useState();
  const [timeRange, setTimeRange] = useState(6);
  const populateData = async () => {
    const resposne = await fetch(
      `http://localhost:9002/employer/api/RecentAppliedStudent/${employer.email}`
    );
    const jsonData = await resposne.json();

    // console.log("jsonDATA", jsonData);
    // setDetails(jsonData);
    setJobId(jsonData);
  };
  const getPosts = async () => {
    const req = await fetch(
      `http://localhost:9002/employer/api/viewAllAdminJobs/${employer.email}`
    );
    const jsonData = await req.json();
    // console.log(data.posts)
    setData(jsonData);
    if (data) {
      let sum = 0;
      data.map((item) => {
        sum = sum + item.applied.length;
      });
      setSize(sum);
    }
    // console.log(data)
  };
  useEffect(() => {
    getPosts();
    populateData();
  }, [size]);

  return (
    <div className="dashboard">
      <h2 className="dashboard-text"> Dashboard Home!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <DashboardCard size={data} num_applicant={size} />
      <div className="chart-noti">
        <div className="chart-bar-emp">
          <div className="chart-val">
            <div className="profile-view">Your Profile Views</div>
            <select
              value={timeRange}
              className="dropdown"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value={6}>Last 6 Month</option>
              <option value={3}>Last 3 Month</option>
              <option value={2}>Last 2 Month</option>
              <option value={1}>Today</option>
            </select>
          </div>
          <DashboardChart timeRange={timeRange} />
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
          {jobId &&
            jobId.map((applicant, ind) => {
              return (
                <EmpCardItem
                  key={applicant.appliedAt}
                  applicantId={applicant.studentId}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EmpDashboard;
