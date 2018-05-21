const mongoose=require('mongoose')
const Schema=mongoose.Schema

const form=new Schema({
    _id:'String',
    form:JSON,
})

const Surveyform=mongoose.model('surveyform',form)
module.exports=Surveyform;