const express = require("express");

const app = express();

//request handler function

// app.use("/user", (req,res) => {
//     res.send("HAHAHAHHAA");
// });

//this will only handle get call to the /user
app.get("/user", (req,res) => {
    res.send({firstname: "Ashish", lastname: "Jangid"});
});

app.post("/user", (req,res) => {
    //saving data to database
    res.send("data successfully saved to the database");
});

app.delete("/user", (req,res) => {
    res.send("deleted successfully");
});

//this will match all the HTTP method API calls to the /test
// app.use("/test", (req, res) => {
//     res.send("Hello from the server!");
// });

app.use("/test/:userID/:name/:password", (req, res) => {
    console.log(req.params);
    res.send("Hello from the server!");
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});