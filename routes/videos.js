var express = require('express');
var router = express.Router();

var Video = require('../models/Video.js');
var Comment = require('../models/Comment.js')

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}

router.get('/contributor', isLoggedIn, function (req, res) {
  // return all videos where req.user._id is $in video contributors array
  // {contributors: {$in: req.user._id}}
})

router.get('/owner', isLoggedIn, function (req, res) {
  // return all videos where owner_id === req.user._id
})



router.post('/', function(req, res){
    // console.log(req.body);
    // res.send("This is from /videos/videos: ");
    
	   // console.log("This is from /submit: "); 

    // console.log("dis b user",req.user);

  var query = {
    yt_id: req.body.yt_id
  }

  Video.findOne(query).populate({
    path: "comments",
    populate: {path:"user"}
  }).exec(function(err, video){
    if (err){
      console.log(err); 
    } else {
      if(video){
        console.log('THIS EXISTS ALREADY!');
        
        res.json(video);
      } else {
        var newVideoRaw = req.body;
        console.log("who is this?!",req.user)
        newVideoRaw.owner_id = req.user._id;

        var newVideo = new Video(newVideoRaw);

        // ????? Saves it to the db
        newVideo.save(function (err, saved) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Saved!');
            Video.findOne(query).populate({
              path: "comments",
              populate: {path:"user"}
            }).exec(function(err, video){
                res.send(video);
            })
          }
        });
      }
    }
  });

  router.get('/test', isLoggedIn, function(req, res){

    console.log(req.body);
    
  });

});

module.exports = router; 