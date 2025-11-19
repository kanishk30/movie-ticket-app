const express = require("express")

const User = require("../models/user.model.js")

const userRouter = express.Router(); // router frome express.

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

        if(req.body.password !== user.password) {
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