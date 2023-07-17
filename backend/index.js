const express = require('express');
var cors = require('cors')
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"])

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/movies',(req,res) =>{
    knex('movies')
        .select('*')
        .then(result => {
            var movieArray = result.map(movie => movie)
            res.json(movieArray)
        })
})

app.get('/movie/:title', (req,res) => {
    const { title } = req.params;
    knex('movies')
    .select('*')
    .where({title})
    .then(result => res.json(result))
})