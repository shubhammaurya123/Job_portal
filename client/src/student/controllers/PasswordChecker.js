

const checkPasswordStrength = (password) => {
    let passwordStrength ;
    let missingChars ;

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (strongRegex.test(password)) {
        passwordStrength = "Strong "
        missingChars = [];
    } else if (mediumRegex.test(password)) {
    passwordStrength = "Medium "
    missingChars = getMissingChars(password,strongRegex)
    } else {
     passwordStrength = "Weak "
     missingChars = getMissingChars(password,mediumRegex)
    }

    return {passwordStrength,missingChars}
  };


const getMissingChars = (password, regex) => {
    const missingChars = [];
    
    if (!password.match(regex)) {
      if (!/(?=.*[a-z])/.test(password)) {
        missingChars.push('lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        missingChars.push('uppercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        missingChars.push('number');
      }
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        missingChars.push('special character');
      }
      if (password.length < 8) {
        missingChars.push('minimum length of 8 characters');
      }
    } 
    return missingChars;
  };


 export default checkPasswordStrength 