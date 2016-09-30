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


//  For routes
var videos = require('./routes/videos');  
var comments = require('./routes/comments');



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

app.use('/comments', comments); 
app.use('/videos', videos);


app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
