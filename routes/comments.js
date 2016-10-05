var express = require('express');
var router = express.Router();

var Video = require('../models/Video.js');
var Comment = require('../models/Comment.js')

router.post('/', function(req, res) {

  console.log("This is from routes/comments: "); 
  console.log(req.body); 

  // use our Comment model to make a new note from the req.body
  var newcomment = new Comment(req.body);
  // Save the new note to mongoose
  newcomment.save(function(err, doc) {
    // send any errors to the browser
    if (err) {
      res.send(err);
    } 
    // Otherwise
    else {
      // Find the video and push the new comment _id into the videos's notes array
      Video.findOneAndUpdate(
        {_id: req.body.video_id}, 
        {$push: {'comments': doc._id}}, 
        {new: true}
      ).populate({
        path: "comments",
        populate: {path:"user"}
      }).exec(function(err, doc) {
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

router.get('/getcomments/:id', function(req, res){
  Comment.find({yt_id: req.params.id}).exec(function(err, doc){
    res.json(doc);
  })
})

module.exports = router; 