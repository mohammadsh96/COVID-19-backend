"use strict";
const express = require("express");
const recordsRouter = express.Router();
const { records } = require("../models/index");
const bearerAuth = require("../middleware/bearer.js");
const acl = require('../middleware/acl.js')
const axios =require('axios')

// add-to-my-record button will trigger this endpoint
recordsRouter.post("/addRecord", bearerAuth ,async  (req, res, next) => {
    console.log(req.user.id)
    req.body.userId =req.user.id
    try {
      let productRecord = await records.create(req.body);
      res.status(201).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  // to get all record stored in database (no-need)
  recordsRouter.get("/records",bearerAuth , acl(['CRUD_Users']) , async(req, res, next) => {
    try {
      let allRecords = await records.get();
      console.log(allRecords);
      
      res.status(200).json(allRecords);
    } catch (e) {
      next(e.message);
    }
  });
  recordsRouter.get("/records/:id",async  (req, res, next) => {
    let id =req.params.id;
    try {
      let productRecord = await records.getById(id);
      console.log(productRecord);
      
      res.status(201).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  recordsRouter.delete("/MyRecords/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
    let id = req.params.id
    if(realId!=userId){
      res.status(403).json({
        message: "Forbidden"
    })
  }
    try {
       await records.delete(userId,realId,id);
        
          res.status(200).json({msg:'record deleted successfully'})
        
    } catch (e) {
      next(e.message);
    }
  });
  recordsRouter.put("/oneProduct/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = parseInt(req.params.userId)
    let realId =req.user.id
    let id = req.params.id
    let obj=req.body;
    console.log('realId: ',typeof realId);
    console.log('userId: ',typeof userId);
    if(userId===realId){

      try {
        let productRecord = await records.update(realId,id,obj);
        if(productRecord) {
          res.status(201).json(productRecord);
  
        }else{
          res.status(203).json({msg:"error in updating record"});
  
        }
      } catch (e) {
        next(e.message);
      }
    }else{
      res.status(404)
    }
  });
  recordsRouter.get("/oneProduct/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
    let id = req.params.id
    
    try {
      let productRecord = await records.getMyProducts(realId,userId,id);
        
      res.status(200).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  recordsRouter.get("/myRecords/:userId", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
   
    
    try {
      let productRecord = await records.getMyProducts(realId,userId);
        
      res.status(200).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  //test data
  recordsRouter.get("/test/:country", async (req, res ) => {
    let country =req.params.country
  const data = await axios.get('https://api.covid19api.com/summary').then((result)=> {
    return result.data;
   
  })
   data.Countries.forEach(async(element) =>  {
    if(element.Country===country){
      const newData = await axios.get(`https://api.covid19api.com/country/${country}/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z`).then((result)=> {
        return result.data;
       
      })
      console.log(newData);
    }
    /*
    {
      Country: 'Argentina',
      CountryCode: 'AR',
      Province: '',
      City: '',
      CityCode: '',
      Lat: '-38.42',
      Lon: '-63.62',
      Cases: 12,
      Status: 'confirmed',
      Date: '2020-03-09T00:00:00Z'
    },
    */
  });
  // console.log(data.Countries.length);
  res.status(200).send(data);
  });
  module.exports =recordsRouter ;