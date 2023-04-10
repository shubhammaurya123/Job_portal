const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

const TopProfile = new mongoose.Schema(
	{
		profileTitle: { type: String},
        openings:{type:Number},
	},
	{ collection: 'top-profile-data' }
)

const topProfileModel = AdminDatabase.model('TopProfile', TopProfile)

module.exports = topProfileModel