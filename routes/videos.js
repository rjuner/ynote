var Video = require('../models/Video.js');
var Comment = require('../models/Comment.js')

var express = require('express');
var router = express.Router();

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



router.post('/videos', function(req, res){

	console.log("This is from /submit: "); 
	console.log(req.body);
  console.log("dis b user",req.user);

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
        newVideoRaw.owner_id = req.user._id;

        var newVideo = new Video(newVideoRaw);

        // ????? Saves it to the db
        newVideo.save(function (err, saved) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log('Saved!');
            res.send(saved);
          }
        });
      }
    }
  });
});

module.exports = router; 