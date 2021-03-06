const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    cors = require("cors"),
    mongoose = require("mongoose"),
    path = require("path"),
    trainDB = require("./trainSeeds"),
    trainRoute = require("./routes/trainRoute"),
    userRoute = require('./routes/userRoute'),
    ticketRoute = require("./routes/ticketRoute"),
    Ticket = require("./models/ticket"),
    User = require("./models/user"),
    schedule = require("node-schedule"),
    keys = require("./config/keys"),
    passport = require("passport"),
    passportConfig = require("./config/passport");

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
// app.use('/', express.static(path.join(__dirname, './build')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": "false"}));
app.use("/", express.static(path.join(__dirname, './build')));

//PASSPORT CONFIG
app.use(passport.initialize());
passportConfig(passport);

app.use("/api/user", userRoute);
app.use("/api/trains",trainRoute);
app.use("/api/ticket", ticketRoute);
// trainDB();
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});




//SCHEDULE FUNCTION FOR TICKETS EXPIRY
const deleteTickets = schedule.scheduleJob("36 0 * * *", ()=> {
  const date = new Date()
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  if(dd<10){
    dd = '0'+dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  let yyyy = date.getFullYear();
  const searchDate = dd+"-"+mm+"-"+yyyy;
  Ticket.find({ dDate: searchDate }, (err, tickets) => {
    if (err) {
      console.log(err);
    }
    else {
      tickets.forEach(ticket => {
        Ticket.deleteOne({ _id: ticket._id }, (err, delTicket) => {
          if (err) {
            console.log(err);
          }
          else {
            User.updateOne({ _id: ticket.user }, { $pull: { tickets: { $in: ticket._id } } }, (err, user) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log("success");
              }
            }
            )
          }
        })
      })
    }
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is Live on "+ port);
})