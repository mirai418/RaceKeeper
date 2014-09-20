/*
  server.js
  main entry point for the application. set the environment/config
  start the server
*/

// set up ======================================================================

var express    = require('express');
var app        = express();
var port       = process.env.PORT || 8080;
var morgan     = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var randomColor = require('randomColor');
console.log(randomColor);

// configuration ===============================================================

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// routes ======================================================================

require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================

app.listen(port);
console.log("App listening on port " + port);
