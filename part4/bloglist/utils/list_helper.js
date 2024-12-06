const Blog = require('../models/blog');

const dummy = (blogs) => {
  return 1
}

// Returns the total number of likes across all blogs.
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes
};