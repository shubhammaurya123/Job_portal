import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import ApplicantDetails from "../Components/ApplicantDetails";

const Applications = () => {
  const [details, setDetails] = useState([]);

  const populateData = async () => {
    const req = await fetch(
      "http://localhost:9002/employer/api/viewApplicants",
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    console.log("test");
    const data = await req.json();
    if (data.status === "ok") {
      setDetails(data.details.jobs);
    } else {
      alert(data.error);
      window.location.href = "/employer/login";
    }
    // console.log(data)
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const employer = jwt_decode(token);
      if (!employer) {
        localStorage.removeItem("token");
        window.location.href = "/employer/home";
      } else {
        populateData();
      }
    } else {
      console.log("Token not found!");
      window.location.href = "/employer/home";
    }
  }, []);

  return (
    <div>
      <h1>Applications</h1>

      {details.map((job, ind) => {
        // console.log(job.applied)
        return (
          <div className="applicant" key={ind}>
            <h3>{job.job_title}</h3>
            {job.applied.map((applicant, ind) => {
              console.log(applicant);
              // const details = getDetails(applicant)
              // console.log(details)
              // return (
              //     <div key={ind}>
              //         <p>Applicant ID : {applicant}</p>
              //         <p>Name:{details?.name}</p>
              //     </div>
              // )
              return <ApplicantDetails key={ind} applicant={applicant} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Applications;
