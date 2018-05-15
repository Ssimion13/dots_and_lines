const express = require("express")
const User = require("../models/user")
const authRouter = express.Router()
const jwt = require("jsonwebtoken")

authRouter.post("/signup", (req, res) => {
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if(err) return res.status(500).send({success: false, err})
        if(existingUser !== null){
            return res.status(400).send({success: false, err: "That username is already in use"})
        }
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            if (err) return res.status(500).send({success: false, err})
            let token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.status(201).send({success: true, user: user.toObject(), token: token})
        })
    })
})

authRouter.post("/login", (req, res) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).send(err)
        if (user) {
            user.checkPassword(req.body.password, function (err, match){
                if(err) throw(err)
                if(!match){
                    res.status(401).send({success: false, message: "Incorrect password"})
                } else {
                    let token = jwt.sign(user.toObject(), process.env.SECRET)
                    res.send({token: token, user: user.withoutPassword(), success: true, message: "Here's your token!"})
                }
            })
        }
    })
})

// authRouter.post("/verify", (req, res) => {
//     console.log(req.user)
//     User.findOne({username: req.user.username.toLowerCase()}, (err, user) => {
//         // user.ch
//         if (err) return res.status(500).send(err)
//         console.log(user);
//         console.log(req.body.token);
//         if(!user || user.password !== req.body.token){
//             return res.status(403).send({success: false, err: "Please Login"})
//         }
//         let token = jwt.sign(user.toObject(), process.env.SECRET)
//         res.send({token: token, user: user.withoutPassword(), success: true, message: "Here's your token!"})
//     })
// })

module.exports = authRouter
