import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { RxEnvelopeClosed } from "react-icons/rx";
import { BsBriefcase, BsBookmark } from "react-icons/bs";
const JobProfile = () => {
  //   const initialDetails = {
  //     personalHiring: false,
  //     companyHiring: false,
  //     companyName: "",
  //     domainName: "",
  //     designation: "",
  //     pinCode: "",
  //     address: "",
  //   };

  const [details, setDetails] = useState({});

  var path = window.location.pathname;
  let urlParts = path.split("/");

  const [jobId, setJobId] = useState(urlParts[3]);

  const getJob = async () => {
    const req = await fetch(`http://localhost:9002/employer/api/job/${jobId}`);
    const jsonData = await req.json();

    // console.log(data.posts)
    setDetails(jsonData[0]);
    // console.log(data)
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
    <div className="employer-dashboard">
      <div className="job-detail-section">
        <div className="details">
          <img
            src="https://picsum.photos/200/300"
            alt="Avatar"
            className="cardImage"
          ></img>
          <div className="Se-listItem">
            <h4 className="cName">{details.job_title}</h4>
            <ul className="text-style">
              <li className="text-style-li">
                {" "}
                <CiLocationOn />
                {details.location}
              </li>
              <li className="text-style-li">
                <BsBriefcase />
                Segment
              </li>
              <li className="text-style-li">
                {" "}
                <FiPhoneCall />
                {details.mode}
              </li>
              <li className="text-style-li">
                {" "}
                <RxEnvelopeClosed />
                {`${details.salarymin ? details.salarymin : "1"} -${
                  details.salarymax ? details.salarymax : "2"
                }`}{" "}
                Lakh{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="right-btn-book">
          <button>Apply For Job</button>
          <div className="job-block">
            {" "}
            <BsBookmark />
          </div>
        </div>
      </div>

      <div className="company-details">
        <div className="about-company">
          <h3 className="aCompany"> Job Description</h3>
          <div>
            As a Product Designer, you will work within a Product Delivery Team
            fused with UX, engineering, product and data talent. You will help
            the team design beautiful interfaces that solve business challenges
            for our clients. We work with a number of Tier 1 banks on building
            web-based applications for AML, KYC and Sanctions List management
            workflows. This role is ideal if you are looking to segue your
            career into the FinTech or Big Data arenas.
          </div>
        </div>
        <div className="sidebar-widget">
          <ul className="widget-text-style">
            <li className="right-widet-style">
              <span className="company-info">Experience:</span>
              <span className="company-info1">
                {" "}
                {`${details.minExp ? details.minExp : ""} - ${
                  details.maxExp ? details.maxExp : ""
                }`}{" "}
                years{" "}
              </span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Date Posted:</span>
              <span className="company-info1">{details.postedDate}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Location:</span>
              <span className="company-info1">{details.location}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Job Title:</span>
              <span className="company-info1">{details.job_title}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">No of Opening</span>
              <span className="company-info1">{details.vacancies}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Social Media:</span>
              <span>
                {" "}
                <div className="social-link">
                  <FiInstagram className="gap" />
                  <BsTwitter className="gap" />
                  <AiFillFacebook className="gap" />
                  <AiFillLinkedin className="gap" />
                </div>
              </span>
            </li>
          </ul>
          <div className="widget-btn">{details.domainName}</div>
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
