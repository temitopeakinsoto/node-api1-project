const express = require('express');
const cors = require('cors');
const db = require('./data/db.js')
const app = express()
app.use(cors()) 
app.use(express.json()) 
const errorMessage = "There was an error with this request...";


app.get('/api/users', getAllUsers)
app.get('/api/users/:id', getUserById)
app.post('/api/users', createNewUser)
app.put('/api/users/:id', updateUserById)
app.delete('/api/users/:id', deleteUserById)

function createNewUser(req, res){
    const newUser = req.body;

    db.insert(newUser)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.status(errorMessage, error)
    })

}

function getUserById(req, res) {
    const { id } = req.params;
    
    db.findById(id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.json(errorMessage, error);
    })
}

function updateUserById(req, res){
    const {id} = req.params;
    const userDetails = req.body;

    db.update(id, userDetails)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.json(errorMessage, error)
    })
}

function getAllUsers(req, res){
    db.find()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
      res.json(errorMessage, error);
    })
}

function deleteUserById(req, res) {
    const {id} = req.params;

    db.remove(id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch(error => {
        res.json(errorMessage, error)
    })
}


app.listen(process.env.PORT || 4000, () => {
    console.log("server running on port " + (process.env.PORT || 4000))
})