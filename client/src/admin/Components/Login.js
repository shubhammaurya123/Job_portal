import React from "react";
import { useState } from "react";
import "../AdminApp.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  
    const response = await fetch("http://localhost:9002/admin/permission/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    
    if (json.success){
        // Save the auth token and redirect
        console.log(json);
        localStorage.setItem('usertoken',JSON.stringify(json)); 
        setCredentials({email: "", password: ""});
        navigate('/admin/home');
         window.location.reload();
        alert("your are loged in")
    }
    else{
        alert("Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <div>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            className="input-aria"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label> Password:</label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            className="input-aria"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="add-btn" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
