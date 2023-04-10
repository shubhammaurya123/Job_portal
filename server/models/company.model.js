const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

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