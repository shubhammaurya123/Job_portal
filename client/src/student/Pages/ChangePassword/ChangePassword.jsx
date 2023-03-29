import React, {useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import checkPasswordStrength from "../../controllers/PasswordChecker";
import PasswordInput from "../../Component/PasswordInput";

function ChangePassword() {
  const navigate = useNavigate();
  const { temp_password } = useParams();
  const TempEmail = localStorage.getItem("temp_email")
  console.log(TempEmail,temp_password)

  const [changePasswordData, setChangePasswordData] = useState({
    confirm_password: "",
    new_password: "",
    isMatch:false
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [missingChars, setMissingChars] = useState([]);
  const [apiMsg, setApiMsg] = useState();
  



  
  // This password change handler calling api for changing user password after getting temporary password mail
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const {  new_password ,isMatch} = changePasswordData;
     if(isMatch){
        const changingPassword = await fetch(
            "http://localhost:9002/api/user/changePassword",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ TempEmail, temp_password, new_password }),
            }
          );
      
          const changedPasswordRes = await changingPassword.json();
          console.log(changedPasswordRes);
          if (changedPasswordRes.status === 200) {
            navigate("/student/login", { state: {from:"/student/change_password",message:'Now login with new password'} });
          } else {
            setApiMsg(changedPasswordRes.statusMsg);
          }
     }
  };

  const handlePasswordChange = (event) => {
    setChangePasswordData({
      ...changePasswordData,
      new_password: event.target.value,
    });
    const { passwordStrength, missingChars } = checkPasswordStrength(
      event.target.value
    );
    setPasswordStrength(passwordStrength);
    setMissingChars(missingChars);
  };

  const handleConfirmPassword = (e) => {
    if(changePasswordData.new_password === e.target.value){
        setChangePasswordData({
         ...changePasswordData,isMatch:true,confirm_password: e.target.value,
        })
        setApiMsg('')
    }else{
        setApiMsg('Password do not match')
        setChangePasswordData({
            ...changePasswordData,
            confirm_password: e.target.value,isMatch:false
          });
    }
  };

  return (
    <div className="change-password-cn">
      <form type="submit" onSubmit={resetPasswordHandler}>
        <h2>Enter New Password</h2>
        <PasswordInput
          value={changePasswordData.new_password}
          handlePasswordChange={handlePasswordChange}
          placeholder="New Password"
        />
        <PasswordInput
          value={changePasswordData.confirm_password}
          handlePasswordChange={handleConfirmPassword}
          placeholder="Confirm Password"
        />
        <p>Password Strength: {passwordStrength}</p>
        {missingChars.length > 0 && (
          <p className="password-check">Missing: {missingChars.join(", ")}</p>
        )}
        <button >Reset Password</button>
      </form>
      <p>{apiMsg}</p>
    </div>
  );
}

export default ChangePassword;
