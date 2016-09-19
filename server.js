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

mongoose.connect('mongodb://localhost/ynoteDB'); 
var db = mongoose.connection; 

//	show errors 
db.on('error', function(err){
	console.log('Mongoose Error: ', err); 
});

db.once('open', function(){
	console.log('Mongoose connection successful.'); 
}); 

// Model for the URLS that get put into the form
var Video = require('./models/Video.js'); 

// var exampleVideo = new Video({
// 	title: "Test Video", 
// 	url: "https://vimeo.com/76979871", 
// 	duration: 61.86
// })

// exampleVideo.save(function(err, doc){
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log(doc);
// 	}
// }); 

app.get('/', function(req, res) {
  res.send(index.html);
});

// Route to see what user looks like without populating
app.get('/video', function(req, res) {
  Video.find({}, function(err, doc) {
    // send any errors to the browser
    if (err) {
      res.send(err);
    } 
    // or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});

// Listen on Port 3000
app.listen(3030, function() {
  console.log('App running on port 3030!');
});
