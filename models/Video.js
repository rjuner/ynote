var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  yt_url: {
    type:String,
    unique: true,
    required: true
  }, 
  duration: {
    type: String, 
    required: true
  }, 
  yt_id:{
    type: String,
    unique: true,
    required: true
  }, 
  owner_id: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: 'Comment'
  }]
});

// create the Video model with the VideoSchema
var Video = mongoose.model('Video', VideoSchema);

// Export the user model
module.exports = Video;
