const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')

const Designation = new mongoose.Schema(
	{
		designation: { type: String},
       
	},
	{ collection: 'designation-data' }
)

const designation = AdminDatabase.model('designation', Designation)

module.exports = designation