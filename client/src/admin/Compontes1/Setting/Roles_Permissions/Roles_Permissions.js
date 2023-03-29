import React from "react";

import { useState } from "react";
function RolesPermission() {
  const [permissions, setPermissions] = useState({
    Student: false,
    Companies: false,
    Report: false,
    jobPosting: false,
    Resume: false,
  });

  const [role, setRole] = useState("");

  const addPermission = async (role, permission) => {
    // API Call

    const response = await fetch(
      `http://localhost:9002/admin/permission/addpermission`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, permission }),
      }
    );
    alert("Add Succesfull");
  };

  const handleClick = (e) => {
    e.preventDefault();
    addPermission(role, permissions);
    setPermissions({
      Student: false,
      Companies: false,
      Report: false,
      jobPosting: false,
      Resume: false,
    });
    setRole("");
  };
  const handleCheckboxChange = (name) => (event) => {
    if (name === "checkbox1") {
      setPermissions({ ...permissions, Student: event.target.checked });
    } else if (name === "checkbox2") {
      setPermissions({ ...permissions, Report: event.target.checked });
    } else if (name === "checkbox3") {
      setPermissions({ ...permissions, Companies: event.target.checked });
    } else if (name === "checkbox4") {
      setPermissions({ ...permissions, jobPosting: event.target.checked });
    } else if (name === "checkbox5") {
      setPermissions({ ...permissions, Resume: event.target.checked });
    }
  };
  const handleOnChange = (e) => {
    setRole(e.target.value);
  };
  return (
    <div className="company">
      <h2 className="company-text">Add Roles&Permission!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="companyItem">
        <div className="addEmployer">
          <div>
            <label>Role:</label>
            <br />
            <input
              type="text"
              placeholder="Enter Role"
              value={role}
              className="input-aria1"
              onChange={handleOnChange}
            />
          </div>

          <div style={{ margin: "10px" }}>
            <label> Which Permisson You want to give?</label>
            <br />
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={permissions.Student}
                  onChange={handleCheckboxChange("checkbox1")}
                  className="checkbox-size"
                />
                <span className="title">Student </span>
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={permissions.Report}
                  onChange={handleCheckboxChange("checkbox2")}
                  className="checkbox-size"
                />
                <span className="title">Report</span>
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={permissions.Companies}
                  onChange={handleCheckboxChange("checkbox3")}
                  className="checkbox-size"
                />
                <span className="title">Companies </span>
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={permissions.jobPosting}
                  onChange={handleCheckboxChange("checkbox4")}
                  className="checkbox-size"
                />
                <span className="title">JobPosting</span>
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked={permissions.Resume}
                  onChange={handleCheckboxChange("checkbox5")}
                  className="checkbox-size"
                />
                <span className="title">Resume</span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="add-btn" onClick={handleClick}>
          Add Permisson
        </button>
      </div>
    </div>
  );
}

export default RolesPermission;

