const express = require("express");
const app = express();

const connectDB= require("./config/database");
const User = require("./models/user");
app.use(express.json());
//this middleware will convert json data into JS object

app.post("/signup", async (req, res) => {
    //creating a new instance of user model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the User " + err.message);
    }
});

connectDB()
.then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("server is listening on port 3000");
    }); 
})
.catch((err) => {
    console.error("Dtabase cannot be connected");
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              