/*****************************************************************************
 * 
 * This file is copyright (c) PTC, Inc.
 * All rights reserved.
 * 
 * Name:        index.js
 * Description: This Node.js file sets up an Express server to provide a RESTful API with 
 * JWT (JSON Web Token) authentication over HTTPS. The server uses client certificate authentication
 *  for secure communication.
 * 
 * Update History:
 * 0.0.1:   Initial Release
 * 
 * Version:     0.0.1
******************************************************************************/

const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const https = require("https") ;
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');

// Create an Express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint for generating JWT tokens
app.post('/generateToken', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  // Check if username and password are valid
  if(userName != 'admin' || password != 'admin'){
    res.status(403).send('Not a verified user')
  }
  const user = {
    user: userName,
    pass: password
  }
  // Generate JWT token with user payload
  jwt.sign({user}, 'secretKey', (err, token) => {
    res.json({
      token
    })
  })
})

// Middleware function to verify JWT tokens
function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    // Verify JWT token
    jwt.verify(bearerToken, 'secretKey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next(); 
      }
    });
  }else{
    res.sendStatus(403);
  }
}

// Root route requiring client certificate and token authentication
app.get('/',verifyToken ,(req, res) => {
    if (!req.client.authorized) {
        return res.status(401).send('Invalid client certificate authentication.');
      }
      res.send('Rest api is live');
  });

// Mount eventRoutes under '/api' path with client certificate and token authentication
app.use('/api',verifyToken ,eventRoutes.routes);

// Create HTTPS server with SSL/TLS certificates and key files
https.createServer({
        cert: fs.readFileSync('./certificates/certs/server.crt'),
        key: fs.readFileSync('./certificates/certs/server.key'),
        requestCert: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync('./certificates/certs/root.crt')
      },
      app
).listen(config.port);

module.exports = {
  verifyToken
}