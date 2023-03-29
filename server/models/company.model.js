const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')

const Company = new mongoose.Schema(
	{
		companyName: { type: String},
        img:
    {
        data: Buffer,
        contentType: String
    }
	},
	{ collection: 'company-data' }
)

const companyModel = AdminDatabase.model('Company', Company)

module.exports = companyModel