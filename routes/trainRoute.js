const express = require("express"),
    Router = express.Router(),
    Train = require("../models/trains");

Router.post("/findTrains", (req,res) => {
    // console.log(req.body);
    
    Train.find({from:req.body.from, to:req.body.to}, (err,trainsFound) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(trainsFound);
            res.send(trainsFound);
        }
    })
})

module.exports = Router;