
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var utils = require('../../lib/utils')
var extend = require('util')._extend





function sendEmail(to, subj, msg){

var email   = require("emailjs");
var server  = email.server.connect({
   user:    "info@codecloud.me", 
   password: process.env.gmailPass, 
   host:    "smtp.gmail.com", 
   ssl:     true
});
server.send({
   text:    msg, 
   from:    "CodeFog <info@codecloud.me>", 
   'to':      to,
  // cc:      "else <else@your-email.com>",
   'subject': subj,
}, function(err, message) { console.log(err || message); });
// send the message and get a callback with an error or details of the message that was sent

}
/**
Index
 */


/**
Index
 */

exports.sendWelcome = function (req, res){
 
 	var email = req.query.email;
 	if(!email){

 		res.send({'status':'fail', 'msg':'please send email'})
 		return false;
 	}

	sendEmail(email, "Welcome to CodeFog", "Hello! We are happy to welcome you to our community to build communities around extraordinary codebases with amazing coders, such as yourself. We will be in touch shortly to schedule a time to chat more!\n\n-CodeFog/CodeCloud.me Team");
	 	console.log(process.env.gmailPass);
	  res.send({'status':'success', 'msg':'sending...'})
  
  return true;
};


exports.messageUs = function (req, res){
 
 	var email = req.body.email;
 	var msg = req.body.msg;
 	if(!email){

 		res.send({'status':'fail', 'msg':'please send email'})
 		return false;
 	}

 	if(!msg){

 		res.send({'status':'fail', 'msg':'please send msg'})
 		return false;
 	}

	sendEmail(email, "Your message has been sent", "Hello! Thanks for reaching out to us! We will be in touch shortly.\n\n-CodeFog/CodeCloud.me Team");
	 
	sendEmail('m@codecloud.me', "You got a new CodeFog MSG", msg +" ...\n\nfrom "+email);
	 

	  res.send({'status':'success', 'msg':'sending...'})
  
  return true;
};





