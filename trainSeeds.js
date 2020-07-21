const mongoose = require("mongoose"),
  Train = require("./models/trains");
genPNr =() => {
  return Math.floor(Math.random()*10000000000);
}
const trains = [
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "CHE",
    to: "MUM",
    name: "Chennai Express",
    dTime: "10:00",
    aTime: "05:00",
    aDate: 0,
    cost: 2500
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "CHE",
    to: "MUM",
    dTime: "22:00",
    aTime: "04:00",
    aDate: 1,
    name: "Maharaja Express",
    cost: 5000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "MUM",
    to: "CHE",
    name: "Chennai Express",
    dTime: "10:00",
    aTime: "05:00",
    aDate: 0,
    cost: 2500
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "MUM",
    to: "CHE",
    dTime: "22:00",
    aTime: "04:00",
    aDate: 1,
    name: "Maharaja Express",
    cost: 5000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "CHE",
    to: "DEL",
    dTime: "08:00",
    aTime: "12:00",
    aDate: 1,
    name: "Delhi Express",
    cost: 2400
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "CHE",
    to: "DEL",
    dTime: "17:00",
    aTime: "21:00",
    aDate: 1,
    name: "Dehradun Express",
    cost: 4800
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "DEL",
    to: "CHE",
    dTime: "08:00",
    aTime: "12:00",
    aDate: 1,
    name: "Delhi Express",
    cost: 2400
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "DEL",
    to: "CHE",
    dTime: "17:00",
    aTime: "21:00",
    aDate: 1,
    name: "Dehradun Express",
    cost:4800
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "CHE",
    to: "KOL",
    dTime: "10:00",
    aTime: "12:00",
    aDate: 1,
    name: "Kolkata Express",
    cost: 1800
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "CHE",
    to: "KOL",
    dTime: "18:00",
    aTime: "20:00",
    aDate: 1,
    name: "Howrah Mail",
    cost: 3600
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "KOL",
    to: "CHE",
    dTime: "10:00",
    aTime: "12:00",
    aDate: 1,
    name: "Kolkata Express",
    cost: 1800
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "KOL",
    to: "CHE",
    dTime: "18:00",
    aTime: "20:00",
    aDate: 1,
    name: "Howrah Mail",
    cost: 3600
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "MUM",
    to: "DEL",
    dTime: "12:00",
    aTime: "04:00",
    aDate: 1,
    name: "Paschim Express",
    cost: 1500
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "MUM",
    to: "DEL",
    dTime: "20:00",
    aTime: "12:00",
    aDate: 1,
    name: "Mumbai Rajdhani",
    cost: 3000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "DEL",
    to: "MUM",
    dTime: "12:00",
    aTime: "04:00",
    aDate: 1,
    name: "Paschim Express",
    cost: 1500
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "DEL",
    to: "MUM",
    dTime: "20:00",
    aTime: "12:00",
    aDate: 1,
    name: "Mumbai Rajdhani",
    cost: 3000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "KOL",
    to: "DEL",
    dTime: "12:00",
    aTime: "07:00",
    aDate: 1,
    name: "Sealdah NEW Delhi Premium Special",
    cost: 2000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "KOL",
    to: "DEL",
    dTime: "20:00",
    aTime: "03:00",
    aDate: 1,
    name: "Kolkata Rajdhani",
    cost: 4000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "DEL",
    to: "KOL",
    dTime: "12:00",
    aTime: "07:00",
    aDate: 1,
    name: "Sealdah NEW Delhi Premium Special",
    cost: 2000
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "DEL",
    to: "KOL",
    dTime: "20:00",
    aTime: "03:00",
    aDate: 1,
    name: "Kolkata Rajdhani",
    cost: 4000
  },
]

function trainDB() {
  Train.remove({}, err => {
    if (err) {
      console.log(err);
    }
  })
  trains.forEach(train => {
    Train.create(train, (err, train) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Seeding Success");
      }
    })
  })
}

module.exports = trainDB;