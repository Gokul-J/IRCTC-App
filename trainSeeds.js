const mongoose = require("mongoose"),
    Train = require("./models/trains");

const trains = [
    {
        from: "CHE",
        to: "MUM",
        cost: 1200
    },
    {
        from: "CHE",
        to: "DEL",
        cost: 2400
    },
    {
        from: "CHE",
        to: "KOL",
        cost: 1800
    },
    {
        from: "CHE",
        to: "MUM",
        cost: 2400
    },
]

function trainDB(){
    Train.remove({}, err => {
        if(err){
            console.log(err);
        }
    })
    trains.forEach(train => {
        Train.create(train, (err,train) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("Seeding Success");
            }
        })
    })
}

module.exports = trainDB;