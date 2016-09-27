var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  url: {
    type:String,
    unique: true, 
    required: true
  }, 
  duration: {
    type: String, 
    required: true
  }, 
  comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }]

});

// create the User model with the UserSchema
var Video = mongoose.model('Video', VideoSchema);

// Export the user model
module.exports = Video;
