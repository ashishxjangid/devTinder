const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+ value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak: "+ value);
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        maxLength: 300,
        default: "This is a default about of user!"
    },
    photoUrl: {
        type: String,
        default: "https://www.example.com/images/sample.jpg$jghv",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url: "+ value);
            }
        }
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);