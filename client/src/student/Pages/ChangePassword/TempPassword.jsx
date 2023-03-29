import React, { useState,useContext } from "react";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { GlobalData } from "../../Context";

function TempPassword() {
  const navigate = useNavigate();
  const [tempPasswordMsg, setTempPasswordMsg] = useState();
  const [isTempPasswordSent, setIsTempPasswordSent] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    temp_password: "",
    new_password: "",
  });
  const [email, setEmail] = useState("");
  const [apiMsg  , setApiMsg] = useState()
  const {setTemp_Email} = useContext(GlobalData)

// This formHandler calling API for sending Temporary password to user email
  const formHandler = async (e) => {
    e.preventDefault();
    const generateTempPassword = await fetch(
      "http://localhost:9002/api/user/sendTempPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const tempPasswordRes = await generateTempPassword.json();
    console.log(tempPasswordRes);
    if (tempPasswordRes.status === 200) {
      setIsTempPasswordSent(true);
    } else {
      setIsTempPasswordSent(false);
    }
    setTempPasswordMsg(tempPasswordRes.statusMsg);
  };

  // This password change handler calling API for Verifying user Temporary password after getting temporary password mail
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const { temp_password, new_password } = changePasswordData;
    const changingPassword = await fetch(
      "http://localhost:9002/api/user/verifyTempPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, temp_password, new_password }),
      }
    );

    const changedPasswordRes = await changingPassword.json();
    console.log(changedPasswordRes);
    if (changedPasswordRes.status === 200 && changedPasswordRes.statusMsg===true) {
        setTemp_Email({
          isTempEmail:true,
          TempEmail:email
        })
        localStorage.setItem("temp_email",email)
        navigate(`/student/change_password/${temp_password}`, {state:{from: '/student/change_password'}})
    }else{
      setApiMsg(changedPasswordRes.statusMsg)
    }
  };


  if (!isTempPasswordSent) {
    return (
      <div className="c-p-cn">
        <form type="submit" onSubmit={formHandler}>
          <h2>Enter Your Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='abc@gmail.com'
          ></input>
          <button>Generate Temporary Password</button>
          <p>{tempPasswordMsg}</p>
        </form>
      </div>
    );
  } else {
    return (
      <div className="c-p-cn">
        <div>
          <p>{tempPasswordMsg}</p>
          <h1>Enter Temporary Password</h1>
          <form type="submit" onSubmit={changePasswordHandler}>
            <h2>Enter Temporary Password</h2>
            <input
              value={changePasswordData.temp_password}
              onChange={(e) =>
                setChangePasswordData({
                  ...changePasswordData,
                  temp_password: e.target.value,
                })
              }
              placeholder='Temp Password'
            ></input>
            <button>Go</button>
          </form>
          <p>{apiMsg}</p>
        </div>
      </div>
    );
  }
}

export default TempPassword;
