const User = require("../models/Blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const Blog = require("../models/Blog");

exports.create = async (req, res, next) => {
  const { content, category, coverImage, title } = req.body;
  const { _id } = req.user;
  try {
    const blog = await new Blog({
      content,
      category,
      coverImage,
      title,
      userId: _id,
    });
    await blog.save();
    res.json(true);
  } catch (e) {
    console.log(e);
  }
};
exports.edit = async (req, res, next) => {
  const { content, category, coverImage, title } = req.body;
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (req.user._id.toString() === blog.userId.toString() || req.user.isAdmin) {
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (coverImage) blog.coverImage = coverImage;
    if (title) blog.title = title;
    blog.update = new Date();
    await blog.save();
  }
  res.json(true);
};
exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("userId", "-password");
    if (blog.views) {
      blog.views = blog.views + 1;
    } else {
      blog.views = 1;
    }
    await blog.save();
    res.json(blog);
  } catch (e) {
    console.log(e);
  }
};
exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (
      req.user._id.toString() === blog.userId.toString() ||
      req.user.isAdmin
    ) {
      const blogs = await Blog.findOneAndRemove({ _id: id });
    }
    res.json(true);
  } catch (e) {
    console.log(e);
  }
};
exports.findAll = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .select("-content")
      .populate("userId", "-password")
      .sort({ update: -1 });
    res.json(blogs);
  } catch (e) {
    console.log(e);
  }
};

exports.findUserBlogs = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const blogs = await Blog.find({ userId: _id }).select("-content");
    res.json(blogs);
  } catch (e) {
    console.log(e);
  }
};
