var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({

  //  This is input in a form by User
  title: {
    type:String,
    unique:true, 
    required: true
  }, 
  url: {
    type:String,
    unique: true, 
    required: true

  }, 
  duration: {
    type: Number, 
    required: true
  }, 
  comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }], 


});

// create the User model with the UserSchema
var Video = mongoose.model('Video', VideoSchema);

// Export the user model
module.exports = Video;
