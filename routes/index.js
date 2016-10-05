var express = require('express');  
var passport = require('passport');  
var router = express.Router();

router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {  
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/user', isLoggedIn, function (req, res) {
  res.json(req.user);
})

router.get('/profile', isLoggedIn, function(req, res) {  
  // console.log(req.user.email);
  //  logs to the server current user's info 
  // console.log(req.session);
  res.render('profile.ejs', { user: req.user });
});

//++++++++++++++++++++++++++++++++++++++++++++++++

// router.get('/landing', function(req, res){
//   res.sendFile('./public/index.html');
// });

//++++++++++++++++++++++++++++++++++++++++++++++++

router.get('/logout', function(req, res) {  
  req.logout();
  res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {  
  successRedirect: '/profile',
  failureRedirect: '/',
}));

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}

router.get('/protected', isLoggedIn, function(req, res){
  console.log("mH UAER!",req.user._id);
  console.log("mH huihiuhuhu!",req.user.passport);
  res.send("access granted. secure stuff happens here.");
});

module.exports = router;  


