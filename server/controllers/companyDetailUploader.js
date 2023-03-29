const Company = require('../models/company.model')
const path = require('path');
const fs = require("fs");

exports.companyDetailUploader = async(req,res)=>{
  
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
    contentType:req.file.mimetype,
   data: Buffer.from(encode_img, 'base64')
};

  const companyName  = req.body.companyName;
  const companyDetail = await Company.create({
      companyName:companyName,
      img:final_img
    });
  res.json({ msg:"Details uploaded" , companyName:companyName})
}