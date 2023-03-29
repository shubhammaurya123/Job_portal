import React, { useEffect, useState , useContext} from "react";
// import "./Student.css";
import fecthContext from "../../Hooks/FecthContext";
import StudentcardItem from "../StudentCardItem/StudentCardItem";
function SingleEmployerPostJob() {
     
    const context = useContext(fecthContext);
    const {email } = context
    const[data , setData] =useState([]);
    console.log(email)
    const getData =async(url)=>{
      const response = await fetch(
      url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log(json);
     setData(json);
  
    }
    useEffect(() => {
        getData(`http://localhost:9002/employer/api/viewAllAdminJobs/${email}`)
     }, []);
    console.log(data);
    //  console.log(data[16].postedBy.email);
  return (
    <div className="studentApp">
      <h2 className="student-text">Employer Post Job!</h2>
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
            {data.length === 0 && <h2>No Job found</h2>}
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
             date ={item.postedDate.slice(0, 10)}
             companytype = {item.companyType}
             vacancies = {item.vacancies}
             mode = {item.mode}
             skills={item.skills} value={"postjob"}/>
          ))
        }
           
        </div>
        
      </div>
    </div>
  );
}

export default SingleEmployerPostJob;
