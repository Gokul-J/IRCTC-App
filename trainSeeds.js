const mongoose = require("mongoose"),
  Train = require("./models/trains");
genPNr =() => {
  return Math.floor(Math.random()*10000000000);
}
const trains = [
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "KOL",
    to: "MUM",
    dTime: "08:00",
    aTime: "14:00",
    aDate: 1,
    name: "Gitanjali Express",
    cost: 2200
  },
  {
    pnr: Math.floor(Math.random()*10000000000),
    from: "KOL",
    to: "MUM",
    dTime: "22:00",
    aTime: "04:00",
    aDate: 1,
    name: "Karmabhoomi Express",
    cost: 4400
  }
]

function trainDB() {
  // Train.remove({}, err => {
  //   if (err) {
  //     console.log(err);
  //   }
  // })
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