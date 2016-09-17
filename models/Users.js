var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type:String,
    unique:true
  },
  userType: {
    type: String
  },
  comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }], 
    onWhichVid: {
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'Video'
  }

});

var User = mongoose.model('User', UserSchema);

module.exports = Video;
