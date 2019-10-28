const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");
const app = express();
app.use(cors());
app.use(express.json());
const errorMessage = "There was an error with this request...";

app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", createNewUser);
app.put("/api/users/:id", updateUserById);
app.delete("/api/users/:id", deleteUserById);

function createNewUser(req, res) {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(501).json(errorMessage, error);
      });
  }
}

function getUserById(req, res) {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if(user){
        res.status(200).json(user);
      }else{
        res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist.' });
      }
      
    })
    .catch(() => {
      res
        .status(500)
        .json({
          errorMessage: "There was an error with this request."
        });
    });
}

function updateUserById(req, res) {
  const { id } = req.params;
  const userDetails = req.body;

  if (!userDetails.name || !userDetails.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(id, userDetails)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.json(errorMessage, error);
      });
  }
}

function getAllUsers(req, res) {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved."
        });
    });
}

function deleteUserById(req, res) {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "the user was successfully deleted."
        });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved."
        });
    });
}

app.listen(process.env.PORT || 4000, () => {
  console.log("server running on port " + (process.env.PORT || 4000));
});
