const express = require("express");
const app = express();

const connectDB= require("./config/database");
const User = require("./models/user");

app.use(express.json());
//this middleware will convert json data into JS object

//request handler function

// app.use("/user", (req,res) => {
//     res.send("HAHAHAHHAA");
// });

//this will only handle get call to the /user
// app.get("/user", (req,res) => {
//     res.send({firstname: "Ashish", lastname: "Jangid"});
// });

// app.post("/user", (req,res) => {
//     //saving data to database
//     res.send("data successfully saved to the database");
// });

// app.delete("/user", (req,res) => {
//     res.send("deleted successfully");
// });

// //this will match all the HTTP method API calls to the /test
// // app.use("/test", (req, res) => {
// //     res.send("Hello from the server!");
// // });

// app.use("/test/:userID/:name/:password", (req, res) => {
//     console.log(req.params);
//     res.send("Hello from the server!");
// });

// app.use(
//     "/try",
//     (req, res, next) => {
//         console.log("Handeling the route 1");
        
//         next();
//         res.send("Response 1");
//     },  
//     (req, res) => {
//         console.log("Handeling the route 2");
//         res.send("Response 2");
//     }
// );

// // app.get("/admin/getalldata", (req, res) => {
// //     //logic of checking if the request is authorized
// //     const token= "xyza";
// //     const isAdminAuthorized= token==="xyz";
// //     if(isAdminAuthorized){
// //         res.send("All data sent");
// //     } 
// //     else{
// //         res.status(401).send("Unauthorized request");
// //     }
// // });

// //Handle auth middleware for get, post..... requests
// app.use("/admin", (req, res, next) => {
//     console.log("Admin auth is getting checked");
//     const token= "xyz";
//     const isAdminAuthorized= token==="xyz";
//     if(isAdminAuthorized){
//         next();
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// });

// app.get("/admin/getAllData", (req, res) => {
//     res.send("All data sent");
// });

// app.get("/admin/deleteUser", (req, res) => {
//     res.send("deleted user");
// });
 
// app.get("/getUserData", (req, res) => {
//     try{
//         //logic of DB call and get user data
//         throw new Error("JHSABHJVS");
//         res.send("User data sent");
//     } catch (err) {
//         res.status(500).send("Some error contact support team");
//     }
// });

app.post("/signup", async (req, res) => {
    //creating a new instance of user model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the User: " + err.message);
    }
});

//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users= await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(400).send("User not found");
        }
        else{
            res.send(users);
        }
        
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }    
})

//Feed API - get all the users from database
app.get("/feed", async (req, res) => {
     try {
        const users= await User.find({});                
        res.send(users);
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }    
});

//API to delete a User from database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
     try {
        await User.findByIdAndDelete(userId);                
        res.send("User deleted successfully");
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }    
});

//Update data of the user
app.patch("/user/:userID", async (req, res) => {
    const userId = req.params?.userID;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "photoUrl","about","gender","age","skills"
        ];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }     

        await User.findByIdAndUpdate(userId, data);                
        res.send("User updated successfully");
    }    
    catch(err) {
        res.status(400).send("Update Failed, "+ err.message);
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              