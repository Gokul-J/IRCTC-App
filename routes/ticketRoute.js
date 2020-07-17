const { modelName } = require("../models/ticket");

const express = require("express"),
    Router = express.Router(),
    Ticket = require("../models/ticket"),
    User = require("../models/user");

Router.post("/create", (req, res) => {
    const newTicket = new Ticket({
        train: req.body.train._id,
        ticketCount: req.body.ticketCount,
        dDate: req.body.dDate,
        aDate: req.body.aDate
    })
    const passengerList = req.body.passengers;
    passengerList.forEach(passenger => {
        newTicket.passengers.push(passenger);
    })
    newTicket.save( (err, ticket) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(ticket);
            User.findById(req.body.userId, (err, foundUser) => {
                if(err){
                    console.log(err);
                }
                else{
                    foundUser.tickets.push(ticket.id);
                    foundUser.save((err, user) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(user);
                        }
                    })
                }
            })
        }
    })
    console.log("ID : "+req.body.userId);
})

module.exports = Router;