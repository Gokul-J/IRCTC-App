const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train'
  },
  ticketCount: Number,
  dDate: String,
  aDate: String,
  passengers: []
})

module.exports = mongoose.model("Ticket", ticketSchema);