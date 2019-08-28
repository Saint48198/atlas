// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
 next()
})

// Set our api routes
app.use('/', api);


/**
 **_ Get port from environment and store in Express.
 _**/
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 _ Create HTTP server.
 _**/
 const server = http.createServer(app);

 /*
 _ Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
