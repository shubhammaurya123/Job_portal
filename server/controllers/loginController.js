const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model')

// JWT_SECRET -- for testing purpose only
const JWT_SECRET = "jhgfsxsxsn";

exports.loginController = async(req,res) =>{
  try{
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.json({status : 404 , statusMsg :'User not found'})
    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
    if(isPasswordValid){
      console.log(user)
      const token = jwt.sign({id:user._id , name:user.name},JWT_SECRET,{expiresIn:'7d'})
    return res.json({status : 200 , user:token})
    }else{
      return res.json({status : 401 , statusMsg :'Wrong password or email'})
    }
  }catch(e){
    console.log(e);
    res.json({status:500 , statusMsg:'Internal Server Error'})
  }
}
