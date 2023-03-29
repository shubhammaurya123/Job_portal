import React, { useEffect, useState } from "react";
import "../AdminApp.css";
function AddUser() {
  const [permission, setPermissions] = useState([]);


  const [credentials, setCredentials] = useState({ role :"" ,name :"", email: "", password: ""}) 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:9002/admin/permission/adduser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role : credentials.role, name: credentials.name , email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('usertoken',JSON.stringify(json)); 
          
            setCredentials({ role :"" ,name :"", email: "", password: ""});
            alert("your User have Addeded")
        }
        else{
            alert("Invalid credentials");
        }
    }
    const getPermission = async () => {
    // API Call
    const response = await fetch(
      `http://localhost:9002/admin/permission/fetchpermission`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setPermissions(json);
  };

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
 }


  useEffect(() => {
    getPermission();
  }, []);
  return (
    <div className="addStudent">
      <div>
      <div>
        <div>
          <label> Role:</label> <br />
          <select  className="role" value={credentials.role} onChange={onChange} name = "role" >
            {permission.map((element) => {
              return <option value={element.role} key = {element._id}>{element.role}</option>;
            })}
          </select>
        </div>
        <div>
          <label> Name:</label>
          <br />
          <input type="text" placeholder="Enter Name" className="input-aria" value={credentials.name} name= "name" onChange={onChange} />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            className="input-aria"
            name = "email"
            value={credentials.email} onChange={onChange}
          />
        </div>
        <div>
          <label> Password:</label>
          <br />
          <input type="password" placeholder="Enter Password" className="input-aria" name = "password"value={credentials.password} onChange={onChange}/>
        </div>
        <button type="submit" className="add-btn" onClick={handleSubmit}>
          Add User
        </button>
      </div>
    </div>
    </div>
  );
}

export default AddUser;
