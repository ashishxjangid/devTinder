const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    password: {
        type: String,
        required: true
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
        default: "xhbfdkjfs37$jghv"
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);