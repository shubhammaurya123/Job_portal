import React, { useEffect, useState } from "react";
import "../Company.css";
import {BsArrowUp} from "react-icons/bs"
function AddEmployer() {


  const [data, setData] = useState({ name: "", email: ""  ,password:"", companyName :"" , domainName:"" , designation:"" , number : "" , pinCode :"" ,address:""});


  const handleSubmit = async (e) => {
    const response = await fetch("http://localhost:9002/employer/api/addemployer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: data.name, email: data.email  ,password:data.password, companyName :data.companyName , domainName:data.domainName , designation:data.designation, number :data.number , pinCode :data.pinCode,address:data.address})
    });
    const json = await response.json()
     console.log(data);
     if(json.success) {
        alert('succesdfully employer added')
     }
     setData({ name: "", email: ""  ,password:"", companyName :"" , domainName:"" , designation:"" , number : "" , pinCode :"" ,address:""});
  }
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="company">
      <h2 className="company-text">Add Employer!</h2>
      <div className="dec-text">Ready to jump back in?</div>
      <div className="companyItem">
        <span className="profile">My profile</span>
        <div className="uplode-btn">
          <form action="/action_page.php" className="document-style">
            <input type="file" id="myFile" name="filename" hidden />
            <BsArrowUp/>
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
            <input type="file" id="myFile" name="filename" hidden />
            <BsArrowUp/>
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
              <label> Company Name:</label>
              <br />
              <input
                type="text"
                placeholder="Enter Comapny Name"
                className="input-aria"
                name="companyName"
                value={data.companyName}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <label> Domain Name:</label>
              <br />
              <input
                type="text"
                placeholder="Enter Domain Name"
                className="input-aria"
                name="domainName"
                value={data.domainName}
                onChange={onChange}
              />
            </div>
            <div className="form-item">
              <label> Your designation:</label>
              <br />
              <input
                type="text"
                placeholder="Enter Designation"
                className="input-aria"
                name="designation"
                value={data.designation}
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
                name="mobail"
                value={data.mobail}
                onChange={onChange}
              />
            </div>

            <div className="form-item">
              <label> Pin Code:</label>
              <br />
              <input
                type="text"
                placeholder="Enter Designation"
                className="input-aria"
                name="pinCode"
                value={data.pinCode}
                onChange={onChange}
              />
            </div>

            <div className="form-item">
              <label> Address:</label>
              <br />
              <input
                type="text"
                placeholder="Address"
                className="input-aria"
                name="address"
                value={data.address}
                onChange={onChange}
              />
            </div>
        
        </div >
           <button type="submit" className="add-btn" onClick={handleSubmit}>
              Add Employer
            </button>
      </div>
    </div>
  );
}

export default AddEmployer;
