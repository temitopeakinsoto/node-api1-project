const express = require('express');
const cors = require('cors');
const db = require('./data/db.js')
const app = express()
app.use(cors()) 
app.use(express.json()) 


app.get('/api/users', getAllUsers)
app.get('/api/users/:id', getUserById)
app.post('/api/users', createNewUser)
app.put('/api/users/:id', updateUserById)

function createNewUser(req, res){
    const newUser = req.body;

    db.insert(newUser)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.json(error)
    })

}

function getUserById(req, res) {
    const { id } = req.params;
    
    db.findById(id)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log(error);
    })
}

function updateUserById(req, res){
    const {id} = req.params;
    const userDetails = req.body
    db.update(id, userDetails)
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
}

function getAllUsers(req, res){
    db.find()
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.log(error);
    })
}


app.listen(process.env.PORT || 4000, () => {
    console.log("server running on port " + (process.env.PORT || 4000))
})