const express = require("express"),
    Router = express.Router(),
    User = require("../models/user"),
    bcrypt = require("bcryptjs"),
    jwt = require("jsonwebtoken");

Router.post("/register", (req,res) => {
    User.findOne({email: req.body.email}, (err,user) => {
        // console.log(user);
        if(user){
            console.log("Exist")
        }
        else{
            console.log("Creating New User");
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {console.log(err)};
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user),
                        console.log(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})

Router.post("/login", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        console.log(user);
        if(!user){
            console.log("User not Found");
        }
        else{
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if(match){
                    const payload = {
                        id: user._id,
                        name: user.name
                    };

                    jwt.sign(payload, "secret", { expiresIn: 31556926}, (err,token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        })
                    })
                }
                else{
                    console.log("Password MisMatch")
                }
            })
        }
    })
})

module.exports = Router;