import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import CardItem from "./CardItem";
const AllJobs = () => {
  const [userEmail, setuserEmail] = useState("");
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const req = await fetch(
      `http://localhost:9002/employer/api/viewAllAdminJobs/${userEmail}`
    );
    const jsonData = await req.json();
    if (data.status === "ok") {
      // console.log(data.posts)
      setData(data);
    } else {
      alert(data.error);
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
        setuserEmail(employer.email);
      }
    } else {
      console.log("Token not found!");
      // window.location.href = '/employer/login'
    }
    getPosts();
  }, []);

  return (
    <div className="studentApp">
      <h2 className="student-text">Employer Post Job!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="studentItem">
        <div className="row">
          <span className="applicant">Posted Job</span>
        </div>
        <div className="studentAllcardItem">
          {data.length === 0 && <h2>No Job found</h2>}
          {data.length > 0 &&
            data.map((item, index) => (
              <CardItem
                key={index}
                id={item._id}
                company={item.company}
                location={item.location}
                title={item.job_title}
                minExp={item.work_exp.minExp}
                maxExp={item.work_exp.maxExp}
                salarymin={item.salaryRange.minSal}
                salarymax={item.salaryRange.maxSal}
                date={item.postedDate.slice(0, 10)}
                companytype={item.companyType}
                vacancies={item.vacancies}
                mode={item.mode}
                skills={item.skills}
                value={"postjob"}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
