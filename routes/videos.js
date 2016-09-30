var Video = require('../models/Video.js');

var express = require('express');
var router = express.Router();

router.post('/', function(req, res){

	console.log("This is from /submit: "); 
	console.log(req.body); 

  Video.findOne({yt_id:req.body.yt_id}, function(err, test){
    if (err){
      console.log(err); 
    } else {
      if(test){
        console.log('THIS EXISTS ALREADY!');
        res.send(test);
      } else {
        var newvideo = new Video(req.body);

        // ????? Saves it to the db
        newvideo.save(function (err, saved) {
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