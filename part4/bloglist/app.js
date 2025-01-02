const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./routes/blogs')
const logger = require('./utils/logger')
const morgan = require('morgan')

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev')) // IMPORTANT: For production, change to 'combined' for more detailed logs

// Connect to MongoDB using the config file with async function
async function connectToDatabase() {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // Exit the application if can't connect to database
  }
}

connectToDatabase()

// Routes
app.use('/api/blogs', blogsRouter)

module.exports = app
