const Designation = require("../models/designation.model");
const TopProfile = require("../models/topProfile.model");
const LocationData = require("../models/location.model") 

const postLocation = async (req,res)=>{
     try{
      const newLocation = await LocationData.create({
        location :req.body.location
      })
      res.json({status:200})
     }catch(e){
      console.log(e)
     }
}

const getLocation = async(req,res) =>{
  try{
    const sortedLocation = await LocationData.find().sort({ clickCount:-1});
    res.json(sortedLocation)
  }catch(e){
    res.json({status:'error' ,msg:e})
  }
}

const updateLocationClickCount = async(req,res) =>{
  try{
      const searchedLocation = req.params.searchLocation
      const location = await LocationData.findOne({location:searchedLocation})
      if(location){
        const locationRes= await location.updateOne({$inc: { clickCount: 1 }})
        return res.json({locationRes})
      }
      const newLocation = await LocationData.create({
        location :searchedLocation,
        clickCount:1
      })
      return res.json({status:200,newLocation})
  }catch(e){
    console.log(e)
  }
}

const postSearchDesignation = async(req,res)=>{
  try{
    const designation = await Designation.create({
      designation :req.body.designation
    });
    res.json({msg:'designation created' ,designation})
  }catch(e){
     res.json({status:'error' , msg:e})
  }
 
}

const getSearchDesignation = async(req,res) =>{
  try{
    const  data = await Designation.find()
    res.json({data})
  }catch(e){
     res.json({status:'error' , msg:e})
  }
}

const postTopProfile = async(req,res) =>{
  try{
    const top_Profile = await TopProfile.create({
      profileTitle : req.body.profileTitle,
      openings :req.body.openings
    });
  res.json({ msg:"Details uploaded" , top_Profile})
  }catch(e){
    res.json({status:'error' , msg:e})
  }
}

const getTopProfile = async(req,res) =>{
  try{
    const topProfileDetail = await TopProfile.find()
    res.json({ topProfileDetail });
  }catch(e){
    res.json({status:'error' , msg:e})
  }
}

module.exports = {postSearchDesignation,getSearchDesignation,postTopProfile,getTopProfile,postLocation,getLocation,updateLocationClickCount}