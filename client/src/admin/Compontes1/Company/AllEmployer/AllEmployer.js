import React, { useEffect, useState,useContext } from "react";
// import "./Student.css";
import fecthContext from "../../../Hooks/FecthContext";
import StudentcardItem from "../../StudentCardItem/StudentCardItem";

function AllEmployer() {
  const [val, setvalue] = useState([]);
  const context = useContext(fecthContext);
  const {data , getData , setEmail} = context
 
  
 useEffect(() => {
    getData("http://localhost:9002/employer/getAllEmployer")
    
 }, []);
  return (
    <div className="studentApp">
      <h2 className="student-text">All Employer!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="studentItem">
        <div className="row">
          <span className="applicant">Applicant</span>

          <div className="selectItem">
            <select value="Select Job" className="dropdown">
              <option>Select Job</option>
              <option>Choise 1</option>
              <option>choise 2</option>
            </select>
            <select value="All Status" className="dropdown">
              <option>All Status</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </div>
        <ul className="studentlistItem">
          <l1 className ="blue-style">Senior Product Designer</l1>
          <l1  className ="blue-style">Total(s): 6</l1>
          <l1  className ="approved-style">Approved: 2</l1>
          <l1 className ="reject-style">Rejected(s): 4</l1>
        </ul>

        <div className="studentAllcardItem">
        {  data.length >0 && data.map((data) => (
             <StudentcardItem key={data._id}name = {data.name} mobile={data.mobile} email ={data.email}  domainName = {data.domainName} designation={data.designation} pinCode={data.pinCode} companyName={data.companyName} value={"Employer"}/>
          ))
        }
           
        </div>
    
        
      </div>
    </div>
  );
}

export default AllEmployer;
