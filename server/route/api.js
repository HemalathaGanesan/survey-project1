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
        console.log(err)
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

router.get('/formnames',function(req,res){
    Surveyform.find({}).then((data)=>{
       var ids= data.map((value)=>{
            return value._id;
        })
        res.send(ids)
    }).catch(err=>{
        res.send({
            err:"No forms are available"
        })

    })
})

router.get('/forms/:id',function(req,res){
    var form=req.params.id;
    Surveyform.aggregate([
        {
          $match: {
            _id:form
          }
        }
      ]).then((data)=>{
          if(data.length!=0){
            res.send(data[0])   
          }else{
            res.send({
                "status":'failure',
                "error":"The form is not found"
            })
          }
    })
    .catch(err=>{
        res.send({
            message:"Internal Server error",
            error:err
        })
    })
})

module.exports=router;