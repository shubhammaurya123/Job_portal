const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdminPermission = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')
const PermissionSchema = new Schema({
  
    role:{
        type: String,
        required: true
    },
    permission : []
  });
  const model = AdminPermission.model('adminPermission', PermissionSchema)

  module.exports = model
 
