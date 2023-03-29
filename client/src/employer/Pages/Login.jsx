import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { loginUser } from "../functions";

const Login = ({ openLogin, closeLogin, openRegister, closeRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password, e) => {
    e.preventDefault();
    const res = await loginUser(email, password, e);
    alert(res.msg);

    // dispatch({
    //     type: ACTIONS.checkLoggedIn
    // })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, e);
    const jobPostDetails = JSON.parse(sessionStorage.getItem("jobDetails"));
    if (jobPostDetails) {
      window.location.href = "/employer/postJob";
    } else {
      window.location.href = "/employer/dashboard";
    }
  };

  const [showPass, setshowPass] = useState(false);

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type={showPass === true ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!showPass && (
          <span className="passView" onClick={() => setshowPass(true)}>
            <AiFillEye />
          </span>
        )}
        {showPass && (
          <span className="passView" onClick={() => setshowPass(false)}>
            <AiFillEyeInvisible />
          </span>
        )}
        <br />
        <input
          className="employerBTN-light"
          id="loginSubmit"
          type="submit"
          value={"Log In"}
        />
      </form>
      <div>
        <p>
          Dont have an account?
          <button
            className="employerBTN"
            onClick={() => {
              // window.location.href = "/employer/register";
              closeLogin();
              openRegister();
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
