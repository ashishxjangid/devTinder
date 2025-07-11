const express = require("express");
const app = express();

const connectDB= require("./config/database");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
//this middleware will convert json data into JS object

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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