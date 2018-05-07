const mongoose=require('mongoose')
const Schema=mongoose.Schema

const form=new Schema({
    _id:'String',
    form:JSON,
    // date:{type:Date,default:Date.now()}
    // date:ISODate("dd-mm-YYYY")
})

const Surveyform=mongoose.model('surveyform',form)
module.exports=Surveyform;