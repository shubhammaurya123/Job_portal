import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getWalletPoints } from "../../functions";
import "./EmpDetails.css";
import { CiLocationOn } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { RxEnvelopeClosed } from "react-icons/rx";
import { BsBriefcase, BsBookmark } from "react-icons/bs";
const EmpDashboard = () => {
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

  const [tempDetails, setTempDetails] = useState(initialDetails);

  const [walletPoints, setwalletPoints] = useState(0);

  const populateData = async () => {
    const req = await fetch("http://localhost:9002/employer/api/details", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      // console.log(data.details);
      setDetails(data.details);
    } else {
      alert(data.error);
      window.location.href = "/employer/home";
    }
    // console.log(data);

    const wallet = await getWalletPoints(localStorage.getItem("token"));
    // console.log(wallet);
    setwalletPoints(wallet.balance);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const employer = jwt_decode(token);
      // console.log(employer);
      if (!employer) {
        localStorage.removeItem("token");
        window.location.href = "/employer/home";
      } else {
        populateData();
      }
    } else {
      // alert("Please Log In!");
      window.location.href = "/employer/home";
    }
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
            <h4 className="cName">{details.companyName}</h4>
            <ul className="text-style">
              <li className="text-style-li">
                {" "}
                <CiLocationOn />
                {details.address}
              </li>
              <li className="text-style-li">
                <BsBriefcase />
                 {details.designation}
              </li>
              <li className="text-style-li">
                {" "}
                <FiPhoneCall />
                {details.number}
              </li>
              <li className="text-style-li">
                {" "}
                <RxEnvelopeClosed />
                 {details.email}
              </li>
            </ul>
            <span className="CardItemlistVlaue">vacancies {details.companyHiring === true ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="right-btn-book">
          <button>Your Points: {walletPoints}</button>
          <div className="job-block">
            {" "}
            <BsBookmark />
          </div>
        </div>
      </div>

      <div className="company-details">
        <div className="about-company">
          <h3 className="aCompany"> About Company </h3>
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
              <span className="company-info">Primary industry:</span>
              <span className="company-info1">software</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Company size:</span>
              <span className="company-info1">{details.designation}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Phone:</span>
              <span className="company-info1">{details.number}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Mail:</span>
              <span className="company-info1">{details.email}</span>
            </li>
            <li className="right-widet-style">
              <span className="company-info">Location:</span>
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

export default EmpDashboard;

//  <div>
//       <div className="details">
//         <h1>Your Details : </h1>
//         <p>Name : {details.name}</p>
//         <p>Email : {details.email}</p>
//         <p>Phone Number : {details.number}</p>
//         <p>Personal Hiring : {details.personalHiring == true ? "Yes" : "No"}</p>
//         <p>Company Hiring : {details.companyHiring == true ? "Yes" : "No"}</p>
//         <p>Company Name : {details.companyName}</p>
//         <p>Domain Name : {details.domainName}</p>
//         <p>Designation : {details.designation}</p>
//         <p>PinCode : {details.pinCode}</p>
//         <p>Address : {details.address}</p>
//       </div>
//       <div className="walletDetails">
//         <h1>Your Points: {walletPoints}</h1>
//         <button
//           onClick={(e) => {
//             window.location.href = "/employer/recharge";
//           }}
//         >
//           Recharge
//         </button>
//       </div>
//     </div>
