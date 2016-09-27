var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  yt_url: {
    type:String,
    required: true
  }, 
  duration: {
    type: String, 
    required: true
  }, 
  yt_id:{
    type: String,
    required: true
  }
});

// create the Video model with the VideoSchema
var Video = mongoose.model('Video', VideoSchema);

// Export the user model
module.exports = Video;
