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
            // console.log(trainsFound);
            res.send(trainsFound);
        }
    })
})

Router.get("/book/:id", (req, res) => {
    console.log(req.params);
    Train.findById(req.params.id, (err, train) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(train);
        }
    })
})

module.exports = Router;