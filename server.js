//	Dependencies
var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var logger = require('morgan'); 
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener


// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Setting up mongoDB 
mongoose.connect('mongodb://localhost/vonntest');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function () {
	console.log('Mongoose connection successful.');
});

var Video = require('./models/Video.js'); 
var Comment = require('./models/Comment.js');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/', function(req, res){
	res.sendFile('./public/index.html')
})

app.get('/write', function(req, res){

	var newVid = new Video({
		url: 'https://www.youtube.com/watch?v=BcsfftwLUf0', 
		duration: '3:04', 
		comments: 'test comment'
	});

	db.videos.save(function(err, doc) {
	  // log any errors
	  if (err) {
	    console.log(err);
	  } 
	  // or log the doc
	  else {
	    console.log(doc);
	  }
	});

});


// app.post('/submit', function(req, res){

// 	var newVideo = new Video(req.body); 

// 	db.videos.save(function(err, saved){
// 		if (err) {
// 			res.send(err);
// 		} else {
// 			res.send(saved);
// 		}
// 	});
// });

// app.get('/videos', function(req, res) {
//   // find all videos in the Video collection
//   Video.find({}, function(err, doc) {
//     // send any errors to the browser
//     if (err) {
//       res.send(err);
//     } 
//     // or send the doc to the browser
//     else {
//       res.send(doc);
//     }
//   });
// });



app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
