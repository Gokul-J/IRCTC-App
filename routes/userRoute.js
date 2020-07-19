const express = require("express"),
  Router = express.Router(),
  User = require("../models/user"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken");

Router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // console.log(user);
    if (user) {
      res.json({flashMessage: "User Exist. Try Log In"})
    }
    else {
      console.log("Creating New User");
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) { console.log(err) };
          newUser.password = hash;
          newUser.save()
            .then(() => res.json({ flashMessage: "Successfully Registered" }),)
            .catch(err => console.log(err));
        })
      })
    }
  })
})

Router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    // console.log(user.id);
    if (!user) {
      res.json({success: false, flashMessage: "Invalid Username or Password"})
    }
    else {
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (match) {
          const payload = {
            id: user.id,
            name: user.name
          };

          jwt.sign(payload, "secret", { expiresIn: 31556952 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token,
              flashMessage: "Successfully Logged In"
            })
          })
        }
        else {
          res.json({success: false, flashMessage:"Invalid Username or Password"});
        }
      })
    }
  })
})

module.exports = Router;