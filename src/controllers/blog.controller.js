const Blog = require('../models/blog.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination3');

const blogController = {
	getAllBlogs: asyncHandler(async (req, res) => {
		const userRole = req.user?.role;

		let queryRole = {};
		if (userRole == 'Admin') {
			queryRole = {};
		} else {
			queryRole = { isPublished: true };
		}

		const { error, data, pagination } = await paginate(Blog, req, queryRole);
		if (error) {
			return res.status(404).json({ success: false, error });
		}

		res.status(200).json({ success: true, data, pagination });
	}),

	getBlog: asyncHandler(async (req, res) => {
		const userRole = req.user?.role;

		let queryRole = {};
		if (userRole == 'Admin') {
			queryRole = {};
		} else {
			queryRole = { isPublished: true };
		}

		const Blog = await Blog.findOne({ _id: req.params.id, ...queryRole });
		if (!Blog) {
			return res.status(404).json({ success: false, error: 'Blog not found' });
		}

		res.status(200).json({ success: true, data: Blog });
	}),

	createBlog: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/Blogs/${req.file.filename}`;
		}

		let status = false;
		if (req.body?.publish_date) {
			status = new Date(req.body?.publish_date) <= Date.now();
		} else {
			status = req.body?.isPublished;
		}

		const newBlog = new Blog({
			...req.body,
			isPublished: status,
		});

		if (!newBlog) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong while create Blog',
			});
		}

		const savedBlog = await newBlog.save();
		res.status(201).json({
			success: true,
			data: savedBlog,
			message: 'Blog was created successfully',
		});
		infoLogger.info(
			`Blog ${savedBlog?.title} | ${savedBlog?._id} | Blog was created successfully by user ${req.user?._id}`
		);
	}),

	updateBlog: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/Blogs/${req.file.filename}`;
		}
		const { id } = req.params;

		// const Blog = await Blog.findById(_id);

		// if (!Blog) {
		// 	return res.status(404).json({ success: false, error: 'Blog not found' });
		// }

		// if (userId !== Blog.creatorId && !req.user.isAdmin) {
		// 	return res.status(403).json({ error: 'Permission denied' });
		// }

		let status = false;
		if (req.body?.publish_date) {
			status = new Date(req.body?.publish_date) <= Date.now();
		} else {
			status = req.body?.isPublished;
		}
		const updatedBlog = await Blog.findByIdAndUpdate(
			{ _id: id },
			{ ...req.body, isPublished: status },
			{ new: true }
		);

		if (!updatedBlog) {
			return res.status(404).json({ success: false, error: 'Blog not found' });
		}

		res.status(201).send({
			success: true,
			data: updatedBlog,
			message: 'Blog was updated successfully',
		});
		infoLogger.info(
			`Blog ${updatedBlog?.title} | ${updatedBlog?._id} | Blog was updated successfully by user ${req.user?._id}`
		);
	}),

	deleteBlog: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedBlog = await Blog.findByIdAndDelete({ _id: id });

		if (!deletedBlog) {
			return res.status(404).json({ success: false, error: 'Blog not found' });
		}

		res.status(201).json({
			success: true,
			message: 'Blog was deleted successfully',
		});
		infoLogger.info(
			`Blog ${deletedBlog?.title} | ${deletedBlog?._id} | Blog was deleted successfully by user ${req.user?._id}`
		);
	}),
};

module.exports = blogController;

// ------------------------------ auto Update Blog Status------------------------
// exports.autoUpdateBlogStatus = async (req, res) => {
// 	try {
// 		const currentDate = new Date();
// 		const draftBlogs = await Blog.find({ isPublished: false });

// 		if (!draftBlogs) return null;

// 		for (const Blog in draftBlogs) {
// 			if (Blog.publish_date >= currentDate) {
// 				await Blog.updateOne(
// 					{ _id: Blog?._id },
// 					{ $set: { isPublished: true } }
// 				);
// 				infoLogger.info(
// 					`Blog ${Blog?.title} | ${Blog?._id} | isPublished auto updated from  false 'draft' to true 'published'`
// 				);
// 			}
// 		}
// 	} catch (error) {
// 		error.message = 'something went wrong while auto update Blog isPublished';
// 		if (process.env.NODE_ENV == 'development') {
// 			console.log(error);
// 		}
// 		errorLogger.error(error);
// 	}
// };
