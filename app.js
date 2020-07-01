//require modules 
const express = require('express');
const logger = require("morgan");
var bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');
const path = require("path");

//makes an express app  
const app = express();

// use Morgan to log requests
app.use(logger("short"));

//body parser stuff
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// open port 3000 for a server 
const PORT = 3000;
app.listen(PORT, () => console.log('Server Running on Port '+ PORT));

const clientID = '149540714264-qr31ptlecdrqh2sloksud4n6de013jnu.apps.googleusercontent.com'; 

// get request for index.html
app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname + "/index.html"));
  });


