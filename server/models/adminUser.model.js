const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdminUser = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')
const UserSchema = new Schema({
  
    role:{
        type: String,
        required: true
     },
     name:{
        type: String,
        required: true
     },
     email:{
        type: String,
        required: true
     },
     password:{
        type: String,
        required: true
     }
  });

  const model = AdminUser.model('adminuser', UserSchema)

 module.exports = model
