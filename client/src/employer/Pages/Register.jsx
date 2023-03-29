import { useEffect, useState } from "react";
import { sendOTP, verifyOTP, checkPasswordStrength } from "../functions";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import countryPhoneCodes from "../Assets/countryPhoneCodes.json";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Register({ openLogin, closeLogin, openRegister, closeRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [num, setNum] = useState("");

  const [DupEmail, setDupEmail] = useState(false);
  const [DupNum, setDupNum] = useState(false);

  const [invalidPhone, setinvalidPhone] = useState(false);

  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);

  const [passStr, setpassStr] = useState();

  const [enableSubmit, setenableSubmit] = useState(false);
  const [showTips, setshowTips] = useState(false);

  const [showPass, setshowPass] = useState(false);

  const [countryCode, setcountryCode] = useState("91");

  const submitForm = (e) => {
    e.preventDefault();

    if (num.length === 10) {
      sendOTP(
        name,
        email,
        password,
        "+" + countryCode + num,
        setOTPSent,
        setDupEmail,
        setDupNum,
        e
      );
    }
    if (num.length !== 10) {
      setinvalidPhone(true);
    }
  };

  useEffect(() => {
    setpassStr(checkPasswordStrength(password));
    if (
      passStr?.strength == "Low" ||
      name.length < 2 ||
      email.length < 4 ||
      num.length != 10
    ) {
      setenableSubmit(false);
    } else {
      setenableSubmit(true);
    }
    if (password.length == 0) {
      setshowTips(false);
    } else {
      setshowTips(true);
    }
  }, [name, email, num, password]);

  return (
    <div className="Register">
      <h1>Register</h1>
      <div className="registerForm">
        <div className="duplicates">
          {DupEmail && <p>Email Already Exists!</p>}
          {DupNum && <p>Number Already Exists!</p>}
          {invalidPhone && <p>Phone Number should be 10 digits!</p>}
        </div>

        {/* <form onSubmit={(e) => registerUser(name, email, password, num, setDupEmail, setDupNum, e)}> */}
        <form onSubmit={(e) => submitForm(e)}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <select
            onChange={(e) => setcountryCode(e.target.value)}
            name="countrySelect"
            id="countrySelect"
          >
            {countryPhoneCodes.map((country, ind) => {
              return (
                <option key={ind} value={country.code}>
                  {country.country}
                </option>
              );
            })}
            <option value="91" selected>
              India
            </option>
          </select>
          <br />
          <span className="countryCodeSpan">{"+" + countryCode} </span>
          <input
            className="phoneInput"
            type="text"
            placeholder="Phone Number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
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
          {showTips && <p>Password Strength : {passStr.strength}</p>}
          {showTips && <p>{passStr?.tips}</p>}
          <br />
          <button
            type="submit"
            className={"employerBTN-light " + `${!enableSubmit && "disabled"}`}
          >
            Generate OTP
          </button>

          {/* <button onClick={(e) => registerUser(name, email, password, num, setDupEmail, setDupNum, e)}>Register</button> */}
          <br />
        </form>
        {OTPSent && (
          <form onSubmit={(e) => verifyOTP(email, password, OTP, e)}>
            <p>An OTP has been sent to {email}</p>
            <input
              type="text"
              placeholder="OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
            <br />
            <button className="employerBTN" type="submit">
              Verify OTP
            </button>
          </form>
        )}
      </div>
      <div>
        <p>
          Already have an account?
          <button
            className="employerBTN"
            onClick={() => {
              // window.location.href = "/employer/login";
              closeRegister();
              openLogin();
            }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
