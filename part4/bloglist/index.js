// IMPORTS 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const morgan = require('morgan');
const blogsRouter = require('./routes/blog');

const app = require('./app')
// const app = express();
const Blog = require('./models/blog');

// index.js

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}

// Connect to MongoDB
// mongoose.connect(config.MONGODB_URI)
// .then(() => {
//   logger.info('Connected to MongoDB'); // Changed to use logger
// })
// .catch((error) => {
//   logger.error('Error connecting to MongoDB:', error.message); // Changed to use logger
// })

// Connect to MongoDB using the config file
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    if (process.env.NODE_ENV !== 'test') {
      // Start server only if not in test environment
      app.listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`);
      });
    }
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  })

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev')); // For production, change to 'combined' for more detailed logs 
app.use('/api/blogs', blogsRouter);

// Routes
app.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    logger.error('Error fetching blogs:', error);  
    response.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
})

app.post('/api/blogs', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    logger.error('Error posting blogs:', error);
    response.status(400).json({ error: 'Invalid blog data' });
  }
})

// Start server
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`); // Changed to use logger
})

module.exports = app;


