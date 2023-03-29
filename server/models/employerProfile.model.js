const mongoose = require('mongoose')

// suppress warning
mongoose.set('strictQuery', true)

const EmployerDB = mongoose.createConnection('mongodb://127.0.0.1:27017/JobPortalAdminDB')

const Employer = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    verified: {
        type: Boolean,
       // required: true
    },
    OTP: {
        type: String
    },
    OTP_expires_at: {
        type: Number
    },
    personalHiring: {
        type: Boolean,
        // required: true
    },
    companyHiring: {
        type: Boolean,
        // required: true
    },
    companyName: {
        type: String,
        // required: true,
    },
    domainName: {
        type: String,
        // required: true,
    },
    designation: {
        type: String,
        // required: true,
    },
    pinCode: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: true,
    },
    quote: {
        type: String,
        // required: true,
    },

},
    { collection: 'employer-data' }
)

// const model = mongoose.model('EmployerData', Employer)

const model = EmployerDB.model('EmployerData', Employer)

module.exports = model