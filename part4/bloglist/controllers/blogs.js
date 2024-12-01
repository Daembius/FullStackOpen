const Blog = require('../models/blog')
const logger = require('../utils/logger')

const getBlogs = async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    logger.error('Error fetching blogs:', error);
    response.status(500).json({ error: 'Something went wrong' });
  }
}

const createBlog = async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    logger.error('Error posting blogs:', error);
    response.status(400).json({ error: 'Invalid blog data' });
  }
}

module.exports = {
  getBlogs,
  createBlog
}