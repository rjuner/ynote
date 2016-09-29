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
mongoose.Promise = Promise;
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
	res.sendFile('./public/index.html');
});

app.post('/submit', function(req, res){

	console.log("This is from /submit: "); 
	console.log(req.body); 

	var newvideo = new Video(req.body);

	// ????? Saves it to the db
	newvideo.save(function (err, saved) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log('Saved!');
			//	????? Sends back the new object
			res.send(saved);
      // console.log("From saved._id: ");
      // console.log(saved._id);

      // var current_video = saved._id;
	  	}
	});
});

// var current_video;

app.post('/comment', function(req, res) {

  console.log(req.body);
	
  // use our Comment model to make a new note from the req.body
  var newcomment = new Comment(req.body);
  // Save the new note to mongoose
  newcomment.save(function(err, doc) {
    // send any errors to the browser
    console.log("DOES THE COMMNET GET SAAAVE")
    if (err) {
      res.send(err);
      console.log("IM AN ERRORRR", err);
    } 
    // Otherwise
    else {
      // Find the video and push the new comment _id into the videos's notes array
      Video.findOneAndUpdate({_id: req.body.video_id}, {$push: {'comments': doc._id}}, {new: true}).populate("comments").exec(function(err, doc) {
        console.log("THIS IS THE VIDEOOO",doc);
        // send any errors to the browser
        if (err) {
          res.send(err);
        } 
        // or send the doc to the browser
        else {
          res.send(doc);
        }
      })
    }
  });
});



app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
