"use strict";
const express = require("express");
const recordsRouter = express.Router();
const { records } = require("../models/index");
const bearerAuth = require("../middleware/bearer.js");


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
  //to delete any Record by it's Id
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
 // to view more details for each records(later)
  recordsRouter.get("/myRecords/:userId/:id", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
    let id = req.params.id
    
    try {
      let productRecord = await records.getMyRecords(realId,userId,id);
        
      res.status(200).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
  // get all records for Certain user
  recordsRouter.get("/myRecords/:userId", bearerAuth , async  (req, res, next) => {
    let userId = req.params.userId
    let realId =req.user.id
   
    
    try {
      let productRecord = await records.getMyRecords(realId,userId);
        
      res.status(200).json(productRecord);
    } catch (e) {
      next(e.message);
    }
  });
 
  module.exports =recordsRouter ;