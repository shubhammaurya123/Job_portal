const mongoose = require('mongoose')

const StudentDB = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true ,},
		mobile:{type : Number } ,
		age:{type:Number },
        gender:{type:String},
	    resume:{type:String},
		profileVideoLink :{type:String},
		appliedJob:{
             type:Array
		},
		skills : {
			type:Array
		},
		bookmarkJob:{
			type:Array
		},
		likedJob:{
			type:Array
		},
		disLikedJob:{
			type:Array
		},
		verified: {
			type: Boolean,
			required: true
		},
		OTP: {
			type: String
		},
		OTP_expires_at: {
			type: Number
		},
		temp_password:{
            type:String
		},
		profileCompleted:{type:Boolean , default:false},
	},
	{ collection: 'user-data' }
)


const model = StudentDB.model('UserData' , User)

module.exports = model