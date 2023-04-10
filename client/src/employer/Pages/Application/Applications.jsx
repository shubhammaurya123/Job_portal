import React, { useEffect, useState, useContext } from "react";
import "./Applications.css";
import jwt_decode from "jwt-decode";
import EmpCardItem from "./EmpCardItem";

function Applications() {
  const [data, setData] = useState([{}]);
  const [details, setDetails] = useState([{}]);
  const [jobId, setJobId] = useState();
  const [job, setJob] = useState();
  const populateData = async () => {
    const token = localStorage.getItem("token");
    const employer = jwt_decode(token);
    const req = await fetch(
      `http://localhost:9002/employer/api/viewAllAdminJobs/${employer.email}`
    );
    const jsonData = await req.json();
    console.log("jsonDATA", jsonData);
    setDetails(jsonData);
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
    // console.log({ jobId });
    // console.log("details", details, jobId);
    const jobVal = details.filter((element) => element._id === jobId);

    setData(jobVal[0].applied);
   
  }, [jobId]);
  // console.log(job)

  return (
    <div className="studentApp">
      <h2 className="student-text">Application!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="studentItem">
        <div className="row">
          <span className="applicant">Applicant</span>

          <div className="selectItem">
            <select
              value={jobId}
              className="dropdown"
              onChange={(e) => setJobId(e.target.value)}
            >
              {details.map((element, ind) => {
              
                return <option value={element._id}> {element._id}</option>;
              })}
            </select>
          </div>
        </div>
        <ul className="studentlistItem">
          <l1 className="blue-style">Senior Product Designer</l1>
          <l1 className="blue-style">Total(s): 6</l1>
          <l1 className="approved-style">Approved: 2</l1>
          <l1 className="reject-style">Rejected(s): 4</l1>
        </ul>

        <div className="studentAllcardItem">
          {data &&
            data.map((applicant, ind) => {
               console.log(applicant , "Applicant");
              return <EmpCardItem applicantId={applicant.studentId} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Applications;
