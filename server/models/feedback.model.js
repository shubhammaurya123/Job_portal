const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')

const feedback = new mongoose.Schema(
    {
        feedback: { type: String },
        name: { type: String },
        img:
        {
            data: Buffer,
            contentType: String
        }
    },
    { collection: 'feedback-data' }
)

const model = AdminDatabase.model('Feedback', feedback)

module.exports = model