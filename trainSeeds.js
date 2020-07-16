const mongoose = require("mongoose"),
    Train = require("./models/trains");

const trains = [
    {
        from: "CHE",
        to: "MUM",
        name: "Chennai Express",
        dTime: "10:00",
        aTime: "05:00",
        aDate: 0,
        cost: 1200
    },
    {
        from: "CHE",
        to: "MUM",
        dTime: "22:00",
        aTime: "04:00",
        aDate: 1,
        name: "Maharaja Express",
        cost: 2400
    },
    {
        from: "CHE",
        to: "DEL",
        dTime: "08:00",
        aTime: "12:00",
        aDate: 1,
        name: "Delhi Express",
        cost: 2400
    },
    {
        from: "CHE",
        to: "KOL",
        dTime: "10:00",
        aTime: "12:00",
        aDate: 1,
        name: "Kolkata Express",
        cost: 1800
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