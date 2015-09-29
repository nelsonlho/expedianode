
/*!

  *Forked from:
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */
/**
 * Module dependencies
 */
 

var fs = require('fs');
var join = require('path').join;
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
//var config = require('config');

connection_string = "127.0.0.1:27017/codefog";
ipaddress='127.0.0.1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	ipaddress= process.env.OPENSHIFT_NODEJS_IP;
  connection_string = "mongodb://"+process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

var app = express();


var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


// Connect to mongodb

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){

		var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(connection_string, options);
};


	}


	else{

		/*
		var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};

*/

		var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(connection_string, options);
};
	}

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models



fs.readdirSync(join(__dirname, 'app/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/models', file));
});

fs.readdirSync(join(__dirname, 'app/controllers')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/controllers', file));
});




// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);


app.listen(port, ipaddress);

console.log('Express app started on port ' + port);

/**
 * Expose
 */

module.exports = app;
