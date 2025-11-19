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

module.exports = userRouter