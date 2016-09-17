//	DEPENDENCIES
var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var logger = require('morgan'); 
var mongoose = require('mongoose'); 

//	use morgan and bodyparser 
app.use(logger('dev')); 
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public')); 

mongoose.connect('mongod://localhost/ynoteDB'); 
var db = mongoose.connection; 

//	show errors 
db.on('error', function(err){
	console.log('Mongoose Error: ', err); 
});

db.once('open', function(){
	console.log('Mongoose connection successful.'); 
}); 

// Model for the URLS that get put into the form
var User = require('./models/Video.js'); 

var exampleVideo = new Video({
	title: "Test Video", 
	duration: 61.86, 
	url: "https://vimeo.com/76979871", 
	


})


