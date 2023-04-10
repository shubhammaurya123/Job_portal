const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdminUser = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')
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
