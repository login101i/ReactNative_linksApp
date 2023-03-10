const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const linkSchema = new mongoose.Schema(
	{
		link: {
			type: String,
			trim: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
		},
		previewURL: {},
		postedBy: {
			type: ObjectId,
			ref: 'User',
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: [{ type: ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Link', linkSchema);
