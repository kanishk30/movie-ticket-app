const express = require("express")

const User = require("../models/user.model.js")

const userRouter = express.Router(); // router frome express.

const bcrypt = require('bcrypt');


// register (signup)

userRouter.post("/register", async (req, res) => {
    try {
        const doesUserExists = await User.findOne({email: req.body.email});
        if(doesUserExists){
            res.send({
                success: false,
                message: "User already exists with the email"
            })
        }

        // hashing password
        const salt = await bcrypt.genSalt() // default 10 rounds.
        console.log(salt)
        const hashedPwd = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPwd;
        // fresh user:
        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "User registered successfully",
            user: newUser
        })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({message: "Something went wrong!"})
    }
})

// login (signin)

userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send({
                success: false,
                message: "User does not exist. Please register"
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        console.log(isPasswordValid)
        if(!isPasswordValid) {
             return res.send({
                success: false,
                message: "Please verify the password. It is incorrect."
            })
        }

         return res.send({
                success: true,
                message: "User logged in successfully."
            })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong!"
        })
    }
})

module.exports = userRouter