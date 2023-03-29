import jwt_decode from "jwt-decode";

export const loginUser = async (email, password, e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:9002/employer/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  if (data.employer) {
    localStorage.setItem("token", data.employer);
    // window.location.href = '/edit'
    return { status: "ok", msg: "Login Succesfull" };
  } else {
    return { status: "error", msg: "Please check your username and password!" };
  }
};

export const sendOTP = async (
  name,
  email,
  password,
  num,
  setOTPSent,
  setDupEmail,
  setDupNum,
  e
) => {
  e.preventDefault();

  const response = await fetch("http://localhost:9002/employer/api/sendOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      num,
    }),
  });

  const data = await response.json();
  console.log(data);
  if (data?.dups?.email) setDupEmail(true);
  else setDupEmail(false);
  if (data?.dups?.phone) setDupNum(true);
  else setDupNum(false);
  if (data.status === "ok") setOTPSent(true);
};

export const verifyOTP = async (email, password, OTP, e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:9002/employer/api/verifyOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      OTP,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.status === "ok") {
    alert("OTP Verified!");
    await loginUser(email, password, e);
    await rechargeWallet(localStorage.getItem("token"), 30);
    window.location.href = "/employer/edit";
  } else {
    alert(data.error);
  }
};

export const createPost = async (jobDetails, e) => {
  e.preventDefault();
  console.log(jobDetails.postedBy);
  const response = await fetch("http://localhost:9002/employer/api/postJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobDetails,
    }),
  });

  const data = await response.json();
  if (data.status === "ok") {
    alert("Post has been submitted!");
    window.location.href = "/employer/posts";
  } else {
    alert("Please try later!");
  }
  console.log(data);
};

export const checkPasswordStrength = (password) => {
  // Initialize variables
  var strength = 0;
  var tips = "";

  // Check password length
  if (password.length < 8) {
    tips += "Password is too short.\n ";
  } else {
    strength += 1;
  }

  // Check for mixed case
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips += "Use both lowercase and uppercase letters.\n";
  }

  // Check for numbers
  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number.\n";
  }

  // Check for special characters
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character.\n";
  }

  // Return results
  if (strength < 2) {
    return {
      strength: "Low",
      tips: tips,
    };
  } else if (strength === 2) {
    return {
      strength: "Medium",
      tips: tips,
    };
  } else if (strength === 3) {
    return {
      strength: "High",
      tips: tips,
    };
  } else {
    return {
      strength: "Very high",
      tips: tips,
    };
  }
};

export const getWalletPoints = async (token) => {
  const employer = jwt_decode(token);
  if (!employer) {
    return {
      status: "Error",
      error: "User not found!",
    };
  }

  const req = await fetch("http://localhost:9002/employer/api/getBalance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      id: employer.id,
    }),
  });

  const data = await req.json();

  console.log(data);
  return data;
};

export const getValue = async () => {
  const req = await fetch("http://localhost:9002/employer/api/getValue");
  const data = await req.json();
  console.log(data);
  return data.value;
};

export const rechargeWallet = async (token, points) => {
  const employer = jwt_decode(token);
  if (!employer) {
    return {
      status: "Error",
      error: "User not found!",
    };
  }

  const req = await fetch("http://localhost:9002/employer/api/recharge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      id: employer.id,
      points: Number(points),
    }),
  });

  const data = await req.json();
  console.log(data);
  if (data.status === "ok") {
    alert("Recharge successful for " + points + " points!");
  } else {
    alert("Recharge Failed!");
  }
  return;
};
