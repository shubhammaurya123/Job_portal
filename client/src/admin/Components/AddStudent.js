import React from "react";
import "../AdminApp.css";
import { useState } from 'react'
function AddStudent() {


  const [data, setData] = useState({ name: "", password: "", email: "", mobile: "", age: "", gender: "", profileVideoLink: "" });


  const handleSubmit = async (e) => {
    const response = await fetch(" http://localhost:9002/api/user/sendOtp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: data.name, password: data.password, email: data.email, mobile: data.mobile, age: data.age, gender: data.gender, profileVideoLink: data.profileVideoLink })
    });
    console.log(data);
    const json = await response.json()
    alert("Student Data added Successfully")
    setData({ name: "", password: "", email: "", mobile: "", age: "", gender: "", profileVideoLink: "" })

  }
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (


    <div className="addStudent">

      <from>
        <div>
          <label> Name:</label>
          <br />
          <input type="text" placeholder="Enter Name" className="input-aria" name="name" value={data.name} onChange={onChange} />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input type="email" placeholder="Enter Email" className="input-aria" name="email" value={data.email} onChange={onChange} />
        </div>
        <div>
          <label> Password:</label>
          <br />
          <input type="password" placeholder="Name" className="input-aria" name="password" value={data.password} onChange={onChange} />
        </div>
        <div>
          <label> Mobile:</label>
          <br />
          <input type="Mobile" placeholder="Enter Mobail Number" className="input-aria" name="mobile" value={data.mobile} onChange={onChange} />
        </div>
        <div>
          <div>
            <label> Video Link:</label>
            <br />
            <input type="link" placeholder="Enter Video Link" className="input-aria" name="profileVideoLink" value={data.profileVideoLink} onChange={onChange} />
          </div>
          <label> Gender:</label>
          <br />
          <select value={data.gender} name="gender" onChange={onChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label> Age:</label>
          <br />
          <input type="Number" placeholder="Enter Mobail Age" name="age" value={data.age} onChange={onChange} />
        </div>

        <button type="submit" className="add-btn" onClick={handleSubmit}>Add Student</button>
      </from>
    </div>

  );
}

export default AddStudent;
