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

app.use(
    "/try",
    (req, res, next) => {
        console.log("Handeling the route 1");
        
        next();
        res.send("Response 1");
    },  
    (req, res) => {
        console.log("Handeling the route 2");
        res.send("Response 2");
    }
);

// app.get("/admin/getalldata", (req, res) => {
//     //logic of checking if the request is authorized
//     const token= "xyza";
//     const isAdminAuthorized= token==="xyz";
//     if(isAdminAuthorized){
//         res.send("All data sent");
//     } 
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// });

//Handle auth middleware for get, post..... requests
app.use("/admin", (req, res, next) => {
    console.log("Admin auth is getting cheked");
    const token= "xyz";
    const isAdminAuthorized= token==="xyz";
    if(isAdminAuthorized){
        next();
    }
    else{
        res.status(401).send("Unauthorized request");
    }
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("deleted user");
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});