import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { BsBriefcase, BsBookmark } from "react-icons/bs";
import Applications from "../Application/Applications";
import jwt_decode from "jwt-decode";
import EmpCardItem from "../Application/EmpCardItem";
function EmpDashboard() {
  const token = localStorage.getItem("token");
  const employer = jwt_decode(token);
  const [data, setData] = useState([]);
  const [size, setSize] = useState();
  const[jobId , setJobId] =useState();
  const populateData = async () => {
   
    const resposne = await fetch(
      `http://localhost:9002/employer/api/RecentAppliedStudent/${employer.email}`
    );
    const jsonData = await resposne.json();
    console.log(jsonData);
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
        {jobId &&
            jobId.map((applicant, ind) => {
              return <EmpCardItem key ={applicant.appliedAt} applicantId={applicant.studentId} />;
            })}
        </div>
        
      </div>
    </div>
  );
}

export default EmpDashboard;
