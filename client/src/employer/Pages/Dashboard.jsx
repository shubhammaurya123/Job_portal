import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getWalletPoints } from "../functions";

const Dashboard = () => {
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
    <div>
      <div className="details">
        <h1>Your Details : </h1>
        <p>Name : {details.name}</p>
        <p>Email : {details.email}</p>
        <p>Phone Number : {details.number}</p>
        <p>Personal Hiring : {details.personalHiring == true ? "Yes" : "No"}</p>
        <p>Company Hiring : {details.companyHiring == true ? "Yes" : "No"}</p>
        <p>Company Name : {details.companyName}</p>
        <p>Domain Name : {details.domainName}</p>
        <p>Designation : {details.designation}</p>
        <p>PinCode : {details.pinCode}</p>
        <p>Address : {details.address}</p>
      </div>
      <div className="walletDetails">
        <h1>Your Points: {walletPoints}</h1>
        <button
          onClick={(e) => {
            window.location.href = "/employer/recharge";
          }}
        >
          Recharge
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
