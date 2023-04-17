import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./Studentprofile.css";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { RxEnvelopeClosed } from "react-icons/rx";
import { BsBriefcase, BsBookmark } from "react-icons/bs";
const StudentProfile = () => {
  const initialDetails = {
    personalHiring: false,
    companyHiring: false,
    companyName: "",
    domainName: "",
    designation: "",
    pinCode: "",
    address: "",
  };

  const [details, setDetails] = useState(initialDetails);

  

  var path = window.location.pathname;
  let urlParts = path.split("/");
 
  const[studentId , setStudentId] = useState(urlParts[3]);
  
 
  const getDetails = async () => {
    const res = await fetch('http://localhost:9002/employer/api/applicantDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            applicant_id: studentId,
        })
    })
    const data = await res.json()
    console.log(data)
    if (data.status === 'ok') {
        setDetails(data.applicant)
    }
    else {
        console.log('Error')
    }
   
}

  useEffect(() => {
     getDetails();
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
            <h4 className="cName">{details.name}</h4>
            <ul className="text-style">
              <li className="text-style-li">
                {" "}
                <CiLocationOn />
                  India
              </li>
              <li className="text-style-li">
                <BsBriefcase />
                  Software developer
              </li>
              <li className="text-style-li">
                {" "}
                <FiPhoneCall />
                {details.mobile}
              </li>
              <li className="text-style-li">
                {" "}
                <RxEnvelopeClosed />
                 {details.email}
              </li>
            </ul>
           
          </div>
        </div>
        <div className="right-btn-book">
          <button>Download CV</button>
          <div className="job-block">
            {" "}
            <BsBookmark />
          </div>
        </div>
      </div>

      <div className="company-details">
        <div className="about-company">
          <h3 className="aCompany"> Candidates About</h3>
          <div>
            Moody’s Corporation, often referred to as Moody’s, is an American
            business and financial services company. It is the holding company
            for Moody’s Investors Service (MIS), an American credit rating
            agency, and Moody’s Analytics (MA), an American provider of
            financial analysis software and services.
          </div>
        </div>
        <div className="sidebar-widget">
          <ul className="widget-text-style">
            <li className="right-widet-style">
              <span className="company-info">Experience:</span>
              <span className="company-info1">software</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Age:</span>
              <span className="company-info1">{details.age}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Gender::</span>
              <span className="company-info1">{details.number}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Mail:</span>
              <span className="company-info1">{details.email}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Language:</span>
              <span className="company-info1">{details.address}</span>
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

export default StudentProfile;
