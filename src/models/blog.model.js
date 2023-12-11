const mongoose = require('mongoose');
const { Schema } = mongoose;
const { enum_BlogsCategory } = require('../config/enums');
const { deleteUploadedFile } = require('../utils/deleteUploadedFile');

const articleSchema = new Schema({
	title: {
		type: String,
		required: [true, 'please provide the article category'],
		trim: true,
	},
	// category: {
	// 	type: String,
	// 	enum: enum_BlogsCategory,
	// 	required: [true, 'please provide the article category'],
	// 	trim: true,
	// },
	categories: [
		{
			type: String,
			// enum: enum_ArticlesCategory,
			required: [true, 'please provide the article category'],
			trim: true,
		},
	],
	content: [
		{
			type: String,
			required: [true, 'please provide the article content'],
		},
	],
	tags: {
		type: String,
		required: [true, 'please provide the article content'],
	},
	// publish_date: Date,
	cover: String, // image
	// publish_by: {
	// 	type: mongoose.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User',
	// },
	// isPublished: {
	// 	type: Boolean,
	// 	default: false,
	// },
});

articleSchema.pre('findOneAndUpdate', deleteUploadedFile);
articleSchema.pre('findOneAndDelete', deleteUploadedFile);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
