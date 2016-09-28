var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  timecode: {
    type:String,
    required: true
  }, 
  video_obj_id: {
    type: Schema.Types.ObjectId, 
    ref: 'Video'
  }, 
  comment:{
    type: String,
    required: true
  }
});

// create the Video model with the VideoSchema
var Comment = mongoose.model('Comment', CommentSchema);

// Export the user model
module.exports = Comment;
