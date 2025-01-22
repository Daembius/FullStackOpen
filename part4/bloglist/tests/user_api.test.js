const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash: 'sekret',
    })
    await user.save()
  })

  after(async () => {
    await mongoose.connection.close()
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)

    assert.match(response.body.error, /username must be unique/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper status code and message if username or password too short', async () => {
    const usersAtStart = await User.find({})

    const tooShortUser = {
      username: 'ro',
      name: 'Shorty',
      password: 'pw',
    }

    const response = await api.post('/api/users').send(tooShortUser).expect(400)

    assert.match(
      response.body.error,
      /username and password must be at least 3 characters long/
    )

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})
