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

app.post('/handle', function(request, response){
    const token = request.body.idtoken;
    //console.log(token);
    response.send("custom response");

    const client = new OAuth2Client(clientID);
    async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const aud = payload['aud'];
    const iss = payload['iss'];
    const full_name = payload['name'];
    const family_name = payload['family_name'];
    const given_name = payload['given_name'];
    const picture = payload['picture'];
    const email = payload['email'];
    const email_verified = payload['email_verified'];
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    //console.log('payload: ' + payload);
    console.log('aud: ' + aud);
    console.log('iss: ' + iss);
    console.log('Full Name: ' + full_name);
    console.log('Family Name: ' + family_name);
    console.log('Given Name: ' + given_name);
    console.log('Picture Link: ' + picture);
    console.log('email: ' + email);
    console.log('verified: ' + email_verified);
    console.log('userid: ' + userid);
    }
    verify().catch(console.error);
})

