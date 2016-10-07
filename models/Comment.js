var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  timecode: {
    type: Number,
    required: true
  }, 
  comment:{
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
});

// create the Video model with the VideoSchema
var Comment = mongoose.model('Comment', CommentSchema);

// Export the user model
module.exports = Comment;
