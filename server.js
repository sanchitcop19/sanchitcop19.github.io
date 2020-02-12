const express = require('express')
const app = express()
const path = require('path')

app.get('/homepage', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'))
})

console.log('Server listening at http://localhost:5081/homepage')
app.use(express.static('static/js'))
app.use(express.static('static/css'))
app.use(express.static('static/assets'))
app.listen(5081)