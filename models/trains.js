const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    pnr: Number,
    from: String,
    to: String,
    name: String,
    dTime: String,
    aTime: String,
    aDate: Number,
    cost: Number
})

module.exports = mongoose.model("Train", trainSchema);