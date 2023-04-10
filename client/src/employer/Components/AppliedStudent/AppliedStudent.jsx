import React, { useEffect, useState, useContext } from "react";

import jwt_decode from "jwt-decode";
import EmpCardItem from "../../Pages/Application/EmpCardItem";

function AppliedStudnet() {
  const [data, setData] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const employer = jwt_decode(token);
      if (!employer) {
        localStorage.removeItem("token");
        window.location.href = "/employer/home";
      } 
    } else {
      console.log("Token not found!");
      window.location.href = "/employer/home";
    }
    // console.log({ jobId });
    // console.log("details", details, jobId);
    const JobData = localStorage.getItem("itemJobValue");
    const jsonData= JSON.parse(JobData);
    setData(jsonData.applied);
   
  }, []);
  // console.log(job)

  return (
    <div className="studentApp">
      <h2 className="student-text">Applied Student!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="studentItem">
        <div className="row">
          <span className="applicant" >Applicant</span>
        </div>
       
        <div className="studentAllcardItem">
        {
           !data && <h1>No job Found</h1>
         }
          {data &&
            data.map((applicant, ind) => {
              return <EmpCardItem applicantId={applicant.studentId} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default  AppliedStudnet;
