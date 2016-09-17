var mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 

var CommentSchema = new Schema({
	comment: {
		type:String, 
		required: true, 
		unique:true
	}, 

	//	Below should come from the video
	//	& user selecting timecode 
	timecode: {
		type: Number, 
		required: true
	}, 
	userCommenting: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	}, 
	onWhichVid: {
		type: Schema.Types.ObjectId, 
		required: true,
		ref: 'Video'
	}
});

var Comment = mongoose.model('Comment'. CommentSchema); 

module.exports = Comment;