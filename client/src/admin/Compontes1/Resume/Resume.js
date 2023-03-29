import React, { useEffect, useState , useContext } from "react";
import "./Resume.css";
import StudentcardItem from "../StudentCardItem/StudentCardItem";
import fecthContext from "../../Hooks/FecthContext";
function Resume() {
  const context = useContext(fecthContext);
  const {data , getData} = context
 useEffect(() => {
    getData(`http://localhost:9002/api/user/getAllUser`)
    console.log(data)
 }, []);
  
  return (
    <div className="studentApp">
      <h2 className="student-text">Resume Shortlisted!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="studentItem">
        <div className="row">
          <span className="applicant">Shortlisted Resume</span>

          <div className="selectItem">

            <input type="text" placeholder="Search.." className="search"/>
            <select value="All Status" className="dropdown">
              <option>All Status</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </div>
     

        <div className="studentAllcardItem">
        {data.length >0 && data.map((data) => (
          <StudentcardItem key={data._id}name = {data.name} mobile={data.mobile} email ={data.email}  age = {data.age} gender={data.gender} profileViedoLink={data.profileViedoLink} value={"Student"}/>
         ))
         }
        </div>
        
      </div>
    </div>
  );
}

export default Resume;
