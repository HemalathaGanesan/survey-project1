const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PetSchema=new Schema({
    value:JSON
})
const Users=mongoose.model('survey',PetSchema)   
module.exports=Users
