const { modelName } = require("../models/ticket");

const express = require("express"),
  Router = express.Router(),
  Ticket = require("../models/ticket"),
  User = require("../models/user");

Router.post("/create", (req, res) => {
  console.log(req.body);
  const newTicket = new Ticket({
    user: req.body.user,
    train: req.body.train._id,
    ticketCount: req.body.ticketCount,
    dDate: req.body.dDate,
    aDate: req.body.aDate,
  })
  const passengerList = req.body.passengers;
  passengerList.forEach(passenger => {
    newTicket.passengers.push(passenger);
  })
  newTicket.save((err, ticket) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(ticket);
      User.findById(req.body.user, (err, foundUser) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(foundUser);
          foundUser.tickets.push(ticket.id);
          foundUser.save((err, user) => {
            if (err) {
              console.log(err);
            }
            else {
              console.log(user);
              res.send("Success")
            }
          })
        }
      })
    }
  })
  console.log("ID : " + req.body.userId);
})

Router.get("/:id", (req, res) => {
  User.findById(req.params.id).populate({ path: "tickets", populate: { path: "train" } }).exec((err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(user.tickets);
    }
  })
})

module.exports = Router;