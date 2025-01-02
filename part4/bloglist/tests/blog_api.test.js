require('dotenv').config()
const mongoose = require('mongoose')
const { test, after, before, beforeEach } = require('node:test')
const assert = require('assert') // Include assert from Node.js assert module
const supertest = require('supertest')
const app = require('../app') // Now pointing to app.js
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs } = require('./test_helper')
const config = require('../utils/config')

before(async () => {
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogDocuments = blogs.map((blog) => new Blog(blog))
  await Blog.insertMany(blogDocuments)
})

test('blogs are returned as json and have id property', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Check if there are blogs in the response
  assert.strictEqual(response.body.length, blogs.length)

  // Check if each blog has an id property
  response.body.forEach((blog) => {
    assert.ok(blog.id !== undefined, 'id should be defined')
    assert.ok(blog._id === undefined, '_id should not be present')
  })
})

after(async () => {
  await mongoose.connection.close()
})
