const mongoose = require('mongoose')
const AdminDatabase = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

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