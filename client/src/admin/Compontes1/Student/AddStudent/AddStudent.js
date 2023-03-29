import React, { useEffect, useState } from "react";
// import "../Company.css";
import { BsArrowUp } from "react-icons/bs";
function AddStudent() {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    profileVideoLink: "",
  });

  const handleSubmit = async (e) => {
    const response = await fetch(" http://localhost:9002/api/user/sendOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        password: data.password,
        email: data.email,
        mobile: data.mobile,
        age: data.age,
        gender: data.gender,
        profileVideoLink: data.profileVideoLink,
      }),
    });
    console.log(data);
    const json = await response.json();
    alert("Student Data added Successfully");
    setData({
      name: "",
      password: "",
      email: "",
      mobile: "",
      age: "",
      gender: "",
      profileVideoLink: "",
    });
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="company">
      <h2 className="company-text">Add New Student!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="companyItem">
        <span className="profile">My profile</span>
        <div className="uplode-btn">
          <form action="/action_page.php" className="document-style">
            <input type="file" id="myFile" name="filename" hidden />
            <BsArrowUp />
            <span>Browse Logo</span>
          </form>

          <span className="file-text">
            Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
            are .jpg & .png
          </span>
        </div>
        <hr />
        <div className="uplode-btn">
          <form action="/action_page.php" className="document-style">
            <input type="file" id="myFile1" name="filename" hidden />
            <BsArrowUp />
            <span>Browse Logo</span>
          </form>
          <span className="file-text">
            Max file size is 1MB, Minimum dimension: 330x300 And Suitable files
            are .jpg & .png
          </span>
        </div>
        <hr />
        <div className="addEmployer">
       
            <div className="form-item">
              <label> Name:</label>
              <br />
              <input
                type="text"
                placeholder="Enter Name"
                className="input-aria"
                name="name"
                value={data.name}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <label>Email:</label>
              <br />
              <input
                type="email"
                placeholder="Enter Email"
                className="input-aria"
                name="email"
                value={data.email}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <label> Password:</label>
              <br />
              <input
                type="password"
                placeholder="Name"
                className="input-aria"
                name="password"
                value={data.password}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <label> Mobile:</label>
              <br />
              <input
                type="Mobile"
                placeholder="Enter Mobail Number"
                className="input-aria"
                name="mobile"
                value={data.mobile}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <div>
                <label> Video Link:</label>
                <br />
                <input
                  type="link"
                  placeholder="Enter Video Link"
                  className="input-aria"
                  name="profileVideoLink"
                  value={data.profileVideoLink}
                  onChange={onChange}
                />
              </div>
              <div className="form-item">
              <label> Gender:</label>
              <br />
              <select value={data.gender} name="gender" onChange={onChange} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>
              </div>
            </div>
            <div className="form-item">
              <label> Age:</label>
              <br />
              <input
                type="Number"
                placeholder="Enter Mobail Age"
                name="age"
                value={data.age}
                onChange={onChange}
                className="input-aria"
              />
            </div>

           
         
        </div>
        <button type="submit" className="add-btn" onClick={handleSubmit}>
              Add Student
           </button>
      </div>
    </div>
  );
}

export default AddStudent;
