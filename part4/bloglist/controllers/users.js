const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

// Simple GET route for basic user information
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}, '-blogs') // removes 'blogs: []' from the display - TO DELETE IN NEXT EXERCISE
    response.json(users)
  } catch (error) {
    response
      .status(500)
      .json({ error: 'An error occurred while fetching users' })
  }
})

// GET route showing username, name, ID and blogs (title & URL)
// usersRouter.get('/', async (request, response) => {
//   try {
//     const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
//     response.json(users)
//   } catch (error) {
//     response
//       .status(500)
//       .json({ error: 'An error occurred while fetching users' })
//   }
// })

module.exports = usersRouter
