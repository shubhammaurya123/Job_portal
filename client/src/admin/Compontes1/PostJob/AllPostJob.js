import React, { useEffect, useState , useContext} from "react";
// import "./Student.css";
import fecthContext from "../../Hooks/FecthContext";
import StudentcardItem from "../StudentCardItem/StudentCardItem";
function AllPostJob() {
    
    const context = useContext(fecthContext);
    const {data , getData} = context
    useEffect(() => {
        getData("http://localhost:9002/employer/api/viewAllAdminJobs");
     }, []);
   
    //  console.log(data[16].postedBy.email);
  return (
    <div className="studentApp">
      <h2 className="student-text">All Post Job!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="studentItem">
        <div className="row">
          <span className="applicant">Posted Job</span>

          <div className="selectItem">
            <select value="Select Job" className="dropdown">
              <option>Select Job</option>
              <option>Choise 1</option>
              <option>choise 2</option>
            </select>
          </div>
        </div>
        <div className="studentAllcardItem">
        {  data.length >0 && data.map((item , index) => (
          
             <StudentcardItem  key={index}
             id={item._id}
             company={item.company}
             location={item.location}
             title={item.job_title}
             minExp={item.work_exp.minExp}
             maxExp={item.work_exp.maxExp}
             salarymin={item.salaryRange.minSal}
             salarymax={item.salaryRange.maxSal}
             companytype = {item.companyType}
             vacancies = {item.vacancies}
             mode = {item.mode}
             date ={item.postedDate.slice(0, 10)}
             skills={item.skills} value={"postjob"}/>
          ))
        }
           
        </div>
        
      </div>
    </div>
  );
}

export default AllPostJob;
