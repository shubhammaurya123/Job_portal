import React from "react";
import '../AdminApp.css'
function Student() {
  return (
  
     <div className="student">
         <div className="card">
         <a href="/student/addstudent" className="decoration"> Add New Student</a>
         </div>
         <div className="card">
             <a href="/student/addstudent" className="decoration"> All Stdudent Data</a>
         </div>
     </div>
   
  );
}

export default Student;
