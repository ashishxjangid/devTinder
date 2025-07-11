const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        //Validation of data
        validateSignUpData(req);
        
        const {firstName, lastName, emailId, password} = req.body;
        //Encrypt the passwod
        const passwordHash = await bcrypt.hash(password, 10);

        //creating a new instance of user model
        const user = new User({firstName, lastName, emailId, password: passwordHash});
        
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async (req,res) => {
    try {
        const {emailId, password} = req.body;

        const user= await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password); 

        if(isPasswordValid){
            //create a JWT token
            const token = await user.getJWT();

            //add the token to the cookie and send the response back to the user
            res.cookie("token", token);
            res.send("login successfull");
        } else{
            throw new Error("Invalid credentials");
        } 
    }
    catch(err) {
        res.status(400).send("ERROR: "+ err.message);
    }
});

module.exports = authRouter;