const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mediaSchema = new Schema({
	fileUrl: {
		type: String,
		required: true
	},
	fileName: {
		type: String,
		required: true
	},
	uploadDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = Media = mongoose.model('media-upload', mediaSchema);
