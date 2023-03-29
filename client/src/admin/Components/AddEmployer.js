import React from "react";
import "../AdminApp.css";
import { useState } from "react";
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
    <div className="addEmployer">
        <div>
        <div>
          <label> Name:</label>
          <br />
          <input type="text" placeholder="Enter Name" className="input-aria" name="name" value ={data.name}   onChange={onChange} />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input type="email" placeholder="Enter Email" className="input-aria"  name="email" value ={data.email}   onChange={onChange}/>
        </div>
        <div>
       
          <label>Password:</label>
          <br />
          <input type="password" placeholder="Enter Email" className="input-aria"  name="password" value ={data.password}   onChange={onChange}/>
        </div>
        <div>
          <label> Company Name:</label>
          <br />
          <input type="text" placeholder="Enter Comapny Name" className="input-aria" name="companyName" value ={data.companyName}   onChange={onChange}/>
        </div>
        <div>
          <label> Domain Name:</label>
          <br />
          <input type="text" placeholder="Enter Domain Name" className="input-aria"  name="domainName" value ={data.domainName}   onChange={onChange}/>
        </div>
        <div>
          <label> Your designation:</label>
          <br />
          <input type="text" placeholder="Enter Designation" className="input-aria"  name="designation" value ={data.designation} onChange={onChange}/>
        </div>
        
        <div>
          <label> Mobile:</label>
          <br />
          <input type="Mobile" placeholder="Enter Mobail Number" className="input-aria"  name="number" value ={data.number}   onChange={onChange}/>
        </div>
       
        <div>
          <label> Pin Code:</label>
          <br />
          <input type="text" placeholder="Enter Designation" className="input-aria"  name="pinCode" value ={data.pinCode}   onChange={onChange} />
        </div>
         
         
        <div>
          <label> Address:</label>
          <br />
          <input type="text" placeholder="Address" className="input-aria"  name="address" value ={data.address}   onChange={onChange}/>
        </div>
        
        <button type="submit" className="add-btn" onClick={handleSubmit}>Add Employer</button>
      </div>
    </div>
  );
}

export default AddEmployer;
