const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')

const TopProfile = new mongoose.Schema(
	{
		profileTitle: { type: String},
        openings:{type:Number},
	},
	{ collection: 'top-profile-data' }
)

const topProfileModel = AdminDatabase.model('TopProfile', TopProfile)

module.exports = topProfileModel