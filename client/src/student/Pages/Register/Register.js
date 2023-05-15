import React, { useState } from "react";
import "./Register.css";
import checkPasswordStrength from "../../controllers/PasswordChecker";
import PasswordInput from "../../Component/PasswordInput";
import SkillTagsInput from "../../../employer/Components/SkillTagInput/SkillTagInput";
const Register_new = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [missingChars, setMissingChars] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mobile: "",
    skills :[]
  });
  const [tags, setTags] = React.useState([]);
  const [mytags, setMyTags] = useState([]);
  const selectedTags = (tags) => {
    setMyTags(tags)
    return tags;
  };

  const [error, setError] = useState("");
  const [dupEmail, setDupEmail] = useState(false);
  const [dupPhone, setDupPhone] = useState(false);
  const [invalidPhone, setinvalidPhone] = useState(false);
  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);

  const passwordHandler = (e) => {
    setData({ ...data, password: e.target.value });
    const { passwordStrength, missingChars } = checkPasswordStrength(
      e.target.value
    );
    setPasswordStrength(passwordStrength);
    setMissingChars(missingChars);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile, age, gender } = data;
    try {
      if (mobile.length === 10) {
        setinvalidPhone(false);
        const response = await fetch("http://localhost:9002/api/user/sendOtp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            mobile,
            age,
            gender,
            profileCompleted: true,   
            skills:tags,
             }),
        });
        const user_data = await response.json();
        console.log(user_data);
        if (user_data.statusCode === 200) {
          console.log("User Created");
          setOTPSent(true);
          setDupEmail(false);
          setDupPhone(false);
        } else if (user_data.statusCode === 400) {
          setDupEmail(user_data.email);
          setDupPhone(user_data.phone);
        } else {
          setError(user_data.msg);
        }
      } else {
        setinvalidPhone(true);
      }
    } catch (e) {
      setError("Something went wrong");
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    const { email } = data;
    console.log(OTP);
    try {
      if (data.email && !dupEmail) {
        const response = await fetch(
          "http://localhost:9002/api/user/verifyOtp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              OTP,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "verified") {
          localStorage.setItem("token", data.user);
          alert("OTP verified");
          window.location.href = "/student/home";
        } else {
          setError(data.statusMsg);
        }
      } else {
        setError("You need to provide email");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="register-cn" style={{"marginTop":"20px"}}>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label id="name">Full Name: </label>
          <input
            autoComplete="off"
            autoSave="off"
            htmlFor="name"
            value={data.name}
            type="text"
            placeholder="Full Name"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            required
          />
          <br />
          <label id="email">Email: </label>
          <input
            autoComplete="off"
            autoSave="off"
            htmlFor="email"
            value={data.email}
            type="email"
            placeholder="abc@gmail.com"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            required
          />
          <br />
          <div className="password-div">
            {" "}
            <label id="password">Password: </label>
            <PasswordInput
              value={data.password}
              handlePasswordChange={passwordHandler}
              placeholder="Enter Your Password"
            />
          </div>
          <p>Password Strength: {passwordStrength}</p>
          {missingChars.length > 0 && <p>Missing: {missingChars.join(", ")}</p>}

          <br />
          <label id="age">Age: </label>
          <input
            autoComplete="off"
            autoSave="off"
            htmlFor="age"
            value={data.age}
            type="text"
            placeholder="age"
            onChange={(e) => setData({ ...data, age: e.target.value })}
            required
          />
          <br />
          <p>Gender</p>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            onClick={(e) => setData({ ...data, gender: e.target.value })}
          />
          
          <label htmlFor="female">Female</label>
          <br />
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            onClick={(e) => setData({ ...data, gender: e.target.value })}
          />
          <label htmlFor="male">Male</label>
          <br />
          <label id="mobile">Mobile No.: </label>
          <input
            autoComplete="off"
            autoSave="off"
            htmlFor="mobile"
            value={data.mobile}
            type="text"
            placeholder="mobile no."
            onChange={(e) => {
              setData({ ...data, mobile: e.target.value });
            }}
            required
          />
          <br />
         
          <button type="submit">Generate OTP</button>
        </form>
        <SkillTagsInput type={"text"} selectedTags={selectedTags} tags={tags} setTags={setTags}/>
        <div className="error-ct">
          <p>{error}</p>
          {dupEmail && <p>Email Already Exists!</p>}
          {dupPhone && <p>Phone number Already Exists</p>}
          {invalidPhone && <p>Phone number should be of 10 digits</p>}
        </div>
        <form onSubmit={verifyOtpHandler}>
          {OTPSent && <p>An OTP has been sent to {data.email}</p>}
          <input
            type="text"
            placeholder="OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <br />
          <button type="submit" className="reg-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register_new;
