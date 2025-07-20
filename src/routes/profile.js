const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        });
        await loggedInUser.save();

        res.json({message: loggedInUser.firstName + " your profile updated successfully",
            data: loggedInUser});
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body;

        if(!currentPassword || !newPassword){
            throw new Error("Both fields are required");
        }
        const user = req.user;

        const isPasswordValid = await user.validatePassword(currentPassword);
        if(!isPasswordValid){
            throw new Error("Current password is invalid");
        }
        if(currentPassword === newPassword){
            throw new Error("New password must be different");
        }
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Please enter a strong new password");
        }
        //encrypt the password
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        user.password = newPasswordHash;
        await user.save();

        res.send("Password updated successfully");
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

module.exports = profileRouter;