const mongoose = require('mongoose')

const AdminDatabase = mongoose.createConnection('mongodb+srv://skmaurya:skmaurya@cluster0.hqmrxhw.mongodb.net/?retryWrites=true&w=majority')

const SuggestionSkill = new mongoose.Schema(
	{
         SuggSkill :{
             type: String
         },
         verifySkill:{
            type : Boolean,
            default:false
         }
         
    }
)

const SuggSkill = AdminDatabase.model('SuggestionSkill', SuggestionSkill)

module.exports =  SuggSkill