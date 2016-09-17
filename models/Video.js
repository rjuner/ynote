// require mongoose
var mongoose = require('mongoose');

// create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a VideoSchema with the Schema class
var VideoSchema = new Schema({
  // a unique String
  name: {
    type:String,
    unique:true
  },
  // notes property for the user
  notes: [{
  		// store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // the ObjectIds will refer to the ids in the Note model
      ref: 'Note'
  }]
});

// create the User model with the UserSchema
var Video = mongoose.model('Video', VideoSchema);

// Export the user model
module.exports = Video;
