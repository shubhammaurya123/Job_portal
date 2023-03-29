const User = require("../models/user.model");
const EmployerModel = require("../models/employer.model");
const jwt = require("jsonwebtoken");
const funcs = require("../functions");
const JWT_SECRET = "jhgfsxsxsn";
const bcrypt = require("bcryptjs");
var generator = require('generate-password');

const NUMBER_OF_MINUTES = 10; // Minutes before OTP expires


//we want all user so need of this api show I add this api,
//getUserDetail, gives only one user info so weed need all student info
const getAllUser = async (req, res) => {
  try {
    const userDetail = await User.find();
    if(userDetail){
      return res.json(userDetail);
    }else{
      return res.json({status:404 , data:'user not found'})
    }
  } catch (e) {
    res.json(e);
  }
};


const getUserDetail = async (req, res) => {
  
  try {
    const token = req.headers["x-access-token"];
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    const userDetail = await User.findOne({ _id: decoded.id });
    if(userDetail){
      return res.json({ status:200, data: userDetail });
    }else{
      return res.json({status:404 , data:'user not found'})
    }
  } catch (e) {
    console.log(e)
    res.json({ status: 500, msg: "You need to login or register" });
  }
};

// to check if user have applied and bookmarked for a job already
let userJobOptions = {};
const getUserJob = async (req, res) => {

  try {
    const token = req.headers["x-access-token"];
    const jobId = req.params.jobId;
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const data = await User.findOne({ _id: decoded.id });

    const isJobApplied = data.appliedJob.includes(jobId)
    const isJobBookmarked = data.bookmarkJob.includes(jobId)
    const isJobLiked = data.likedJob.includes(jobId)
    const isJobDisliked = data.disLikedJob.includes(jobId)

    userJobOptions.jobIsApplied = isJobApplied
    userJobOptions.jobIsBookmarked = isJobBookmarked
    userJobOptions.jobIsLiked = isJobLiked
    userJobOptions.jobIsDisLiked = isJobDisliked
    res.json({ status: 200, data: userJobOptions });

  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "Something went wrong" });
  }
};

// Update the user collection with the id of job he/she applied
const updateJobApplied = async (req, res) => {
  try {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const query = { _id: id };
    const update = { $push: { appliedJob: jobId } };
    const jobAdded = await User.updateOne(query, update);
    res.json({ status: "ok", msg: true });
  } catch (e) {
    res.json({ status: "error", msg: "Something went wrong" });
  }
};

// Update user collection with the job he/she bookmarked
const updateJobBookmarked = async (req, res) => {
  try {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const query = { _id: id };
    const update = { $push: { bookmarkJob: jobId } };
    const jobBookmarked = await User.updateOne(query, update);
    res.json({
      status: "ok",
      data: jobBookmarked,
      message: "Job has been bookmarked",
    });
  } catch (e) {
    res.status({ status: "error", message: "Something went wrong" });
  }
};

// Delete the bookmarked Job ----->
const deleteBookmarkedJob = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $pull: { bookmarkJob: req.params.jobId } }
    );
    res.json({
      status: "ok",
      message: "This Job has been removed from bookmark ",
    });
  } catch (e) {
    res.json({ status: "error", message: "Something went wrong" });
  }
};

// Increment the no. of likes of job and update the liked job id into user db collection
const likeJob = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({_id:decoded.id})
  try { 
    const jobId = req.params.jobId;
    let incThis = { $inc: { "like": 1 } }
    let pushThis = {$push:{"likedJob" : jobId}}
    let isDisliked = user.disLikedJob.includes(jobId)
    userAction(user,jobId,incThis,pushThis,false,isDisliked)
    return res.json({status:200})
  } catch (e) {
   console.log(e)
  }
};

// Increment the no. of dislikes of job and update the disliked job id into user db collection

const dislikeJob = async (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({_id:decoded.id})
  try { 
    const jobId = req.params.jobId;
    let incThis = { $inc: { "dislike": 1 } }
    let pushThis = {$push:{"disLikedJob" : jobId}}
    let isLiked  = user.likedJob.includes(jobId);
    userAction(user,jobId,incThis,pushThis,isLiked,false)
    res.json({status:200})
  } catch (e) {
   console.log(e)
  }
};

const userAction = async(user,jobId ,incThis,pushThis,isLiked ,isDisliked)=>{
     const job = await EmployerModel.findOne({_id:jobId})
     await job.updateOne(incThis)
     await user.updateOne(pushThis)
    if(isLiked){
      await job.updateOne({$inc: { like: -1 } })
      await user.updateOne({ $pull: { likedJob: jobId } }) ;
     }
    if(isDisliked){
      await job.updateOne({$inc: { dislike: -1 } })
      await user.updateOne({ $pull: { disLikedJob: jobId } }) ;
    }
}

//  Sending OTP and Registering User
const sendUserOtp = async (req, res, next) => {
  // create a random 4 digit number
  var OTP = Math.floor(1000 + Math.random() * 9000).toString();

  const errorMessages = {
    statusCode: null,
    email: false,
    phone: false,
  };

  // Enter the details in the database with "verified" property set to false
  const { name, password, email, mobile, age, gender } = req.body;
  
  // Hashing the password using bcrypt library
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let message = `The OTP for your account verification is ${OTP}`
  try {
    await funcs.sendOTP(req.body.email, message,"OTP for verification");
    await User.create({
      name,
      email,
      mobile,
      age,
      gender,
      password: hashedPassword,
      verified: false,
      //OTP expires after 10 minutes
      OTP_expires_at: Date.now() + 60000 * NUMBER_OF_MINUTES,
      // this OTP can be fetched to check for verification
      OTP: OTP,
    });
    console.log("ok");
    res.status(200).json({ statusCode: 200 });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      errorMessages.statusCode = 400;
      if (error.message.includes("email")) {
        errorMessages.email = true;
      }
      if (error.message.includes("mobile")) {
        errorMessages.phone = true;
      }
    } else {
      errorMessages.statusCode = 500;
      errorMessages.msg = "Internal Server Error";
    }
    res.status(errorMessages.statusCode).json(errorMessages);
  }
};

const verifyUserOtp = async (req, res) => {
  try {
    const verifyAcc = await User.findOne({ email: req.body.email });
    // console.log(verifyAcc);
    if (!verifyAcc)
      return res.json({ status: "not found", statusMsg: "Email Not Found!" });
    if (verifyAcc.OTP !== req.body.OTP)
      return res.json({ status: "invalid", statusMsg: "Invalid OTP" });
    else {
      if (Date.now() > verifyAcc.OTP_expires_at) {
        await User.findOneAndDelete({ email: req.body.email });
        res.json({ status: "expire", statusMsg: "OTP is expired" });
      }
      await User.updateOne(
        { email: req.body.email },
        { $set: { verified: true } }
      );
      const userToken = await User.findOne({ email: req.body.email });
      const token = jwt.sign(
        { id: userToken._id, name: userToken.name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({
        status: "verified",
        statusMsg: "OTP has been verified",
        user: token,
      });
    }
  } catch (e) {
    console.log(e);
    return res.json({status:500 , statusMsg:'Internal Server error'})
  }
};

// API for sending temporary password for password reset to user email

const sendTempPassword = async(req,res)=>{
  let temp_password = generator.generate({
    length: 15,
    numbers: true
  });
  let email_message = `Temporary password for reseting your password is ${temp_password}`
  try{
        
        const user = await User.findOneAndUpdate({email:req.body.email} , {$set:{temp_password:temp_password}})
        if(!user){
          return res.json({status:404 , statusMsg:"Email not found"})
        }
       funcs.sendOTP(req.body.email , email_message , "Temporary password")
       return res.json({status:200 , statusMsg:`Temporary Password is sent to ${req.body.email}`})
  }catch(e){
      return res.json({status:500 , statusMsg:"Internal Server Error"})
  }
} 

const verifyTempPassword = async(req,res)=>{
   try{
    const isUser = await User.findOne({email:req.body.email})
    if(isUser.temp_password === req.body.temp_password){
            return res.json({status:200,statusMsg:true})
    }else{
        return res.json({status:404,statusMsg:'Please Check Your Temporary Password'})
    }
   }catch(e){
    return res.json({status:500 , statusMsg:"Internal Server Error"})
   }
}

//API for Changing password after verifying temporary password
const changePassword = async(req,res)=>{

  try{
        const user = await User.findOne({email:req.body.TempEmail})
        if(user.temp_password === req.body.temp_password){
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.new_password, salt);
          await user.updateOne({password:hashedPassword})
          return res.json({status:200 , statusMsg :'Password Reset'})
        }else{
          return res.json({status:404 ,statusMsg:'Please Check your Temporary password'})
        }
  }catch(e){
       console.log(e)
       return res.json({status:500 , statusMsg:"Internal Server Error"})
  }
}


module.exports = {
  getUserDetail,
  getUserJob,
  updateJobApplied,
  updateJobBookmarked,
  deleteBookmarkedJob,
  dislikeJob,
  likeJob,
  sendUserOtp,
  verifyUserOtp,
  sendTempPassword,
  verifyTempPassword,
  changePassword,
  getAllUser
};
