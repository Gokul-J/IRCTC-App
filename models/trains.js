const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    from: String,
    to: String,
    cost: Number
})

module.exports = mongoose.model("Train", trainSchema);