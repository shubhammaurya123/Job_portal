import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PasswordInput({
  value,
  handlePasswordChange,
  placeholder,
  passwordStyle,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowHide = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input" style={passwordStyle}>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => handlePasswordChange(e)}
        placeholder={placeholder}
        required
      ></input>
      {showPassword ? (
        <FontAwesomeIcon icon={faEye} id="show_hide" onClick={handleShowHide} />
      ) : (
        <FontAwesomeIcon
          icon={faEyeSlash}
          id="show_hide"
          onClick={handleShowHide}
        />
      )}
    </div>
  );
}

export default PasswordInput;
