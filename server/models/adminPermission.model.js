const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdminPermission = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')
const PermissionSchema = new Schema({
  
    role:{
        type: String,
        required: true
    },
    permission : []
  });
  const model = AdminPermission.model('adminPermission', PermissionSchema)

  module.exports = model
 
