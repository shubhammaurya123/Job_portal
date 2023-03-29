const mongoose = require('mongoose')
const AdminDatabase = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')

const LocationData = new mongoose.Schema({
    
        location: {
          type :String,
          required: true, 
          unique: true 
        },
        clickCount:{
            type:Number,
            default:0
        }
    
},{collection:'location-data'})

const LocationModel = AdminDatabase.model('Location', LocationData)

module.exports = LocationModel