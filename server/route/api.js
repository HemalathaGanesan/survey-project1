const express=require('express');
const router=express.Router();
const Survey=require('../models/survey')
const Surveyform=require('../models/surveyForm')
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post("/survey",function(req,res){
    var data=req.body;
    Survey.create({value:data}).then(()=>{
        res.send({
            status:'success'
        })
    })
    .catch(err=>{
        res.send({
            status:'failure',
            error:err
        })
    })
})

router.post('/store',function(req,res){
    var data=req.body;
    Surveyform.create({_id:data.name,form:data.form}).then(()=>{
        res.send({
            status:'success'
        })
    })
    .catch(err=>{
        if(err.code===11000){
        res.send({
            status:'failure',
            "error":"The form name is already present"
        })
    }
    })
})

router.get('/formname',function(req,res){
    Surveyform.find({}).then((data)=>{
       var ids= data.map((value)=>{
            return value._id;
        })
        res.send(ids)
    })
})

router.get('/forms/:id',function(req,res){
    var form=req.params.id;
    
    Surveyform.aggregate([
        {
          $match: {
            _id:form
          }
        },
        {
          $project: {
            _id: 0,
          }
        }
      ]).then((data)=>{
        res.send(data[0])
    })
})

module.exports=router;