
const express = require("express");
const cors = require("cors");
const db = require("./database.js");

const server = express();
server.use(express.json());
server.use(cors())

server.get("/api/", (req,res) => {

    res.json({message: "Welcome to Node Project One"}); 

})

// Get Users List
server.get("/api/users/", (req,res) => {
    const users = db.getUsers();
    if(users) {
      res.json(users);
    } else {
        res.status(500).json({errorMessage: "The users information could not be retrieved." });
    }
})

// Get User By ID
server.get("/api/users/:id", (req,res) => {
    const userId = req.params.id;
    const user = db.getUserById(userId);
    if(user) {
       res.json(user);
    } else {
       res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }  

})

// Delete User By ID
server.delete("/api/users/:id", (req,res) => {
    const userId = req.params.id;
    const user = db.getUserById(userId);
    if(user) {
        const users = db.deleteUser(userId);
        if(users) {
          res.json(user);
        } else {
            //res.json(users);
            res.status(500).json({ errorMessage: "The user could not be removed" });
        }
    } else {

        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
    }
})

// Add User
server.post("/api/users/", (req,res) => {
    
   if(!req.body.name || !req.body.bio) {
       res.status(400).json({errorMessage: "Please provide name and bio for the user."});
   } else {
       const newUser = db.createUser({
                            name: req.body.name,
                            bio: req.body.bio
                       });
        
        if(newUser) {
          res.status(201).json(newUser)
        } else {
          res.status(500).json({errorMessage: "here was an error while saving the user to the database"})  
        }

   }
   
})

// Update User
server.put("/api/users/:id", (req,res) => {
    const userId = req.params.id;
    const user = db.getUserById(userId);
    if(user) {
        if(!req.body.name || !req.body.bio) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."});
        } else { 
            const updatedUser = db.updateUser(user.id, {
                name: req.body.name || user.name,
                bio: req.body.bio || user.bio           
            });
            
            if(updatedUser) {
              res.status(200).json(updatedUser);
            } else {
              res.status(500).json({message: "The user information could not be modified."}) 
            }
        }       
           
    } else {
       
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.listen(9090, () => {
    console.log("Server Started at port 9090");
})