const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

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