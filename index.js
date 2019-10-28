const express = require('express');
const cors = require('cors');
const db = require('./data/db.js')
const app = express()


app.use(cors()) 
app.use(express.json()) 

app.get('/', (req, res) => {
    res.json("hello world from server");
})




app.listen(process.env.PORT || 4000, () => {
    console.log("server running on port " + (process.env.PORT || 4000))
})