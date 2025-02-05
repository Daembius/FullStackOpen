const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./routes/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const morgan = require('morgan')
const middleware = require('./utils/middleware')

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
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
