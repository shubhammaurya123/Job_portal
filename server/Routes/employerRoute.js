const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const funcs = require("../functions");
const { body, validationResult } = require("express-validator");

// constants

const NUMBER_OF_MINUTES = 10; // Minutes before OTP expires
const JWT_SECRET_KEY = "secretKey";

// models
const Employer = require("../models/employerProfile.model");
const Jobs = require("../models/employer.model");
const Student = require("../models/user.model");
const { set } = require("mongoose");

router.route("/").get((req, res) => {
  res.json({ status: "ok", msg: "Hello World" });
});

router.get("/getAllEmployer", async (req, res) => {
  try {
    const employer = await Employer.find();
    res.json(employer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.post(
  "/api/addemployer",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let employer = await Employer.findOne({ email: req.body.email });
      if (employer) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      employer = await Employer.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        number: req.body.number,
        profileVideoLink: req.body.profileVideoLink,
        companyName: req.body.companyName,
        domainName: req.body.domainName,
        designation: req.body.designation,
        pinCode: req.body.pinCode,
        address: req.body.address,
      });
      const data = {
        employer: {
          id: employer.id,
        },
      };
      console.log(req.body);
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);

      let success = true;
      // res.json(user)
      res.json({ success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.route("/api/login").post(async (req, res) => {
  const employer = await Employer.findOne({
    email: req.body.email,
  });

  if (!employer) return { status: "error", error: "Invalid Login!" };

  if (employer.verified !== true) {
    return res.json({ status: "error", error: "Email is not verified" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    employer.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: employer._id,
        name: employer.name,
        email: employer.email,
        companyName: employer.companyName,
      },
      JWT_SECRET_KEY
    );

    return res.json({ status: "ok", employer: token });
  } else {
    console.log("Cant login");
    return res.json({ status: "ok", employer: false });
  }
});

router.route("/api/details").get(async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const employer = await Employer.findOne({ _id: decoded.id });

    return res.json({
      status: "ok",
      details: {
        name: employer.name,
        email: employer.email,
        number: employer.number,
        personalHiring: employer.personalHiring,
        companyHiring: employer.companyHiring,
        companyName: employer.companyName,
        domainName: employer.domainName,
        designation: employer.designation,
        pinCode: employer.pinCode,
        address: employer.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

router.route("/api/details").post(async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const empl = await Employer.findOne({ id: decoded.id });

    await Employer.updateMany(
      {
        id: decoded.id,
      },
      {
        $set: {
          personalHiring: req.body.details.personalHiring,
          companyHiring: req.body.details.companyHiring,
          companyName:
            req.body.details.companyName == ""
              ? empl.companyName
              : req.body.details.companyName,
          domainName:
            req.body.details.domainName == ""
              ? empl.domainName
              : req.body.details.domainName,
          designation:
            req.body.details.designation == ""
              ? empl.designation
              : req.body.details.designation,
          pinCode:
            req.body.details.pinCode == ""
              ? empl.pinCode
              : req.body.details.pinCode,
          address:
            req.body.details.address == ""
              ? empl.address
              : req.body.details.address,
        },
      }
    );

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error: "invalid token" });
  }
});

router.route("/api/sendOTP").post(async (req, res) => {
  // create a random 4 digit number
  var OTP = Math.floor(1000 + Math.random() * 9000).toString();

  // check if the entered email exists in the database
  const employerEmail = await Employer.findOne({
    email: req.body.email,
  });

  const employerPhone = await Employer.findOne({
    number: req.body.num,
  });

  const duplicates = {
    email: false,
    phone: false,
  };

  // if email exists and is verified, set duplicates.email to true
  if (employerEmail && employerEmail.verified) {
    duplicates.email = true;
  }

  // If phone number exists and is verified, set duplicates.phone to true
  if (employerPhone && employerPhone.verified) {
    duplicates.phone = true;
  }

  // if email or phone exists and is verified, throw an error
  if (duplicates.email | duplicates.phone) {
    return res.json({ status: "error", dups: duplicates });
  }

  // if email exists but is not verified, delete the previously entered details
  else if (employerEmail && !employerEmail.verified) {
    await Employer.deleteOne({ email: req.body.email });
  }

  // send the OTP to the email
  funcs.sendOTP(req.body.email, OTP);

  // Enter the details in the database with "verified" property set to false
  try {
    console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await Employer.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      number: req.body.num,
      verified: false,
      //OTP expires after 10 minutes
      OTP_expires_at: Date.now() + 60000 * NUMBER_OF_MINUTES,
      // this OTP can be fetched to check for verification
      OTP: OTP,
    });
    console.log("ok");
    res.json({ status: "ok" });
  } catch (err) {
    console.log(`Not Ok, Error : ${err}`);
    res.json({ status: "error", error: err });
  }
});

router.route("/api/verifyOTP").post(async (req, res) => {
  console.log(req.body);

  verifyAcc = await Employer.findOne({ email: req.body.email });

  console.log(verifyAcc);

  if (!verifyAcc)
    return res.json({ status: "error", error: "Email Not Found!" });

  if (verifyAcc.OTP != req.body.OTP)
    return res.json({ status: "error", error: "Invalid OTP" });
  else {
    if (Date.now() > verifyAcc.OTP_expires_at) {
      await Employer.findOneAndDelete({ email: req.body.email });
      res.json({ status: "Error", error: "OTP has expired" });
    }

    await Employer.updateOne(
      { email: req.body.email },
      { $set: { verified: true } }
    );
    return res.json({ status: "ok" });
  }
});

//this api work to view allPostjob on admin page
router.route("/api/viewAllAdminJobs").get(async (req, res) => {
  try {
    const allPosts = await Jobs.find({});
    res.json(allPosts);
  } catch (err) {
    console.log("Error");
    res.json({ status: "error", error: err });
  }
});
//all job post by single employer search by mail
router.route("/api/viewAllAdminJobs/:email").get(async (req, res) => {
  try {
    const allPosts = await Jobs.find({});
    const posts = allPosts.filter((jobPost) => {
      return jobPost.postedBy.email == req.params.email;
    });
    res.json(posts);
  } catch (err) {
    console.log("Error");
    res.json({ status: "error", error: err });
  }
});
//with the help of  this api you can take  recent applied student information of particuler employer
router.route("/api/RecentAppliedStudent/:email").get(async (req, res) => {
  try {
    const allPosts = await Jobs.find({});
    const posts = allPosts.filter((jobPost) => {
      return jobPost.postedBy.email == req.params.email;
    });
    // console.log({ posts });
    // console.log(req.params.email);
    var allStudents = [];
    for (let i = 0; i < posts.length; ++i) {
      allStudents =allStudents.concat(posts[i].applied);
    }
    //for calculating the one student one time so i used this uniqueObjects function
    const uniqueObjects = allStudents.reduce((acc, obj) => {
      if (!acc.find(item => item.studentId === obj.studentId)) {
        acc.push(obj);
      }
      return acc;
    }, []);
    allStudents =[...uniqueObjects];
    const latestAppliedStudents =allStudents.sort((a, b) => b.appliedAt - a.appliedAt).slice(0,10);
   
    console.log(latestAppliedStudents);
    res.json(latestAppliedStudents);
  } catch (err) {
    console.log("Error");
    res.json({ status: "error", error: err });
  }
});

router.route("/api/viewAllJobs").get(async (req, res) => {
  try {
    const allPosts = await Jobs.find({});
    console.log(allPosts);
    const posts = allPosts.filter((jobPost) => {
      return jobPost.adminVerified == true;
    });
    res.json({ status: "ok", posts: posts });
  } catch (err) {
    console.log("Error");
    res.json({ status: "error", error: err });
  }
});

router.route("/api/postJob").post(async (req, res) => {
  try {
    await Jobs.create({
      id: Date.now(),
      ...req.body.jobDetails,
      adminVerified: false,
    });
    console.log("ok");
    res.json({ status: "ok" });
  } catch (err) {
    console.log(`Not Ok, Error : ${err}`);
    res.json({ status: "error", error: err });
  }
});

router.route("/viewJobs").post(async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const id = decoded.id;
    const name = decoded.name;
    const email = decoded.email;

    const jobs = await Jobs.find({ postedBy: { name: name, email: email } });

    return res.json({
      status: "ok",
      details: {
        jobs: jobs,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

router.route("/api/applicantDetails").post(async (req, res) => {
  const id = await req.body.applicant_id;
  // console.log(id)

  try {
    const student = await Student.findOne({ _id: id });
    if (student) {
      // console.log("Data Sent")
      return res.json({ status: "ok", applicant: student });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "Error", error: error });
  }
});

module.exports = router;
