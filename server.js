//	Dependencies
var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var logger = require('morgan'); 
var mongoose = require('mongoose');

// ========== passport ==========
var path = require('path');  
var passport = require('passport');
var cookieParser = require('cookie-parser');  
var flash = require('connect-flash');  
var session = require('express-session');
// ==============================
//  For routes
var videos = require('./routes/videos');  
var comments = require('./routes/comments');
var routes = require('./routes/index');  
var users = require('./routes/users');


// var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

app.set()

// Run Morgan for Logging
// view engine setup
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); 
mongoose.Promise = Promise;
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
    secret: 'shhsecret',
    resave: true,
    saveUninitialized: false
 }));  
app.use(passport.initialize());  
app.use(passport.session());  
require('./config/passport')(passport);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.use('/comments', comments); 
app.use('/videos', videos);


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.use('/', routes);  
app.use('/users', users);



mongoose.connect('mongodb://localhost/vonntest');
// mongoose.connect('mongodb://heroku_rgk5x3qx:v40dmcp3h6c99f3q5krop2a40o@ds033066.mlab.com:33066/heroku_rgk5x3qx');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

app.listen(process.env.PORT || 3000, function() {
	console.log("App listening to default PORT");
});
