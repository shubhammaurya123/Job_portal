import React from "react";
import { useState } from "react";
import { createSearchParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InterviewSkill = () => {
  const [role, setRole] = useState("");
  const location = useLocation()
  const navigate = useNavigate();
  
  const roleFormHandler = (e)=>{
     e.preventDefault();
     const params ={ role}
     const curLocation = location.pathname
      navigate(`/student/interview_Question?${createSearchParams(params)}`, {
        state: { from:curLocation },
      });
  }

  return (
    <>
      <h2>Check your Interview Skill</h2>
      <form onSubmit={roleFormHandler}>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          placeholder="select"
          >
          <option>--- Select Role ---</option>
          <option value="Front End Developer">Front End Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Software Developer">Software Developer</option>
          <option value="Dev Ops">Dev Ops</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Graphic Designer">Graphic Designer</option>
        </select>
        <button style={{marginLeft:"20px"}}>GO</button>
      </form>
    </>
  );
};

export default InterviewSkill;
