const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    cors = require("cors"),
    mongoose = require("mongoose"),
    path = require("path"),
    trainDB = require("./trainSeeds"),
    trainRoute = require("./routes/trainRoute"),
    userRoute = require('./routes/userRoute')

mongoose.connect("mongodb://localhost/irctc-app", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": "false"}));
app.use("/", express.static(path.join(__dirname, './build')));
app.use("/api/trains",trainRoute);
app.use("/api/user", userRoute);
// trainDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is Live on "+ port);
})