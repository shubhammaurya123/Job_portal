import React, { useEffect, useState } from "react";
// import "./Company.css";
import { BsArrowUp } from "react-icons/bs";
function VerfiySkills() {
  const [skills, setSkills] = useState([]);
  const [idValue, setIdValue] = useState();

  const verify = async (id) => {
    
    const response = await fetch("http://localhost:9002/employer/api/verifysuggSkill", {
        method: "POST",
        body: {
            id : id
        }
      });

    console.log(id);
  };

  const getSkills = async () => {
    const req = await fetch(
      `http://localhost:9002/employer/api/unVerifySkills`
    );
    const jsonData = await req.json();

    setSkills(jsonData);
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div className="company">
      <h2 className="company-text">Verify Skills!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="companyItem">
        {skills.length > 0 && (
          <ul className="showTags">
            {skills.map((suggestion, index) => (
              <>
                <li key={index} className="tag-style1">
                  {suggestion.SuggSkill}
                </li>
                <button onClick={() => verify(suggestion._id)}>
                  {" "}
                  verifySkill
                </button>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VerfiySkills;
