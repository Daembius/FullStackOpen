const Blog = require('../models/blog')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const getBlogs = async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    logger.error('Error fetching blogs:', error)
    response.status(500).json({ error: 'Something went wrong' })
  }
}

const createBlog = async (request, response) => {
  try {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'Title or URL is missing' })
    }

    if (!blog.likes) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    logger.error('Error posting blogs:', error)
    response.status(400).json({ error: 'Invalid blog data' })
  }
}

const deleteBlog = async (request, response) => {
  try {
    const blogId = request.params.id
    logger.info('Attempting to delete blog with ID:', blogId)

    // Validate ObjectId format here if needed
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return response.status(400).json({ error: 'Invalid blog ID format' })
    }

    const blog = await Blog.findOneAndDelete({ _id: blogId })
    if (blog) {
      logger.info('Blog deleted successfully:', blog)
      response.status(204).end()
    } else {
      logger.info('Blog not found for ID:', blogId)
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    logger.error('Error deleting blog:', error)
    response.status(400).json({ error: 'Failed to delete blog' })
  }
}

const updateBlog = async (request, response) => {
  try {
    const blogId = request.params.id
    logger.info('Attempting to update blog with ID:', blogId)

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return response.status(400).json({ error: 'Invalid blog ID format' })
    }

    const blog = await Blog.findById(blogId)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    // Update only the likes, you can extend this to update other fields if needed
    blog.likes = request.body.likes || blog.likes // If likes not provided, keep the existing value

    const updatedBlog = await blog.save()
    logger.info('Blog updated successfully:', updatedBlog)
    response.json(updatedBlog)
  } catch (error) {
    logger.error('Error updating blog:', error)
    response.status(400).json({ error: 'Failed to update blog' })
  }
}

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
}
