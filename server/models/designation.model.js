const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

const Designation = new mongoose.Schema(
	{
		designation: { type: String},
       
	},
	{ collection: 'designation-data' }
)

const designation = AdminDatabase.model('designation', Designation)

module.exports = designation