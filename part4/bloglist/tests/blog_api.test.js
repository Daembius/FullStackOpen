require('dotenv').config()
const mongoose = require('mongoose')
const { test, after, before, beforeEach } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const app = require('../app')
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

  response.body.forEach((blog) => {
    assert.ok(blog.id !== undefined, 'id should be defined')
    assert.ok(blog._id === undefined, '_id should not be present')
  })
})

test('a new blog can be added via POST', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'test-url.com',
    likes: 7,
  }

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdBlog = postResponse.body
  assert.ok(
    createdBlog.id !== undefined,
    'id should be defined for the newly created blog'
  )
  assert.ok(
    createdBlog._id === undefined,
    '_id should not be present for the newly created blog'
  )

  const blogsInDb = await Blog.find({})
  assert.strictEqual(blogsInDb.length, blogs.length + 1)

  const addedBlog = blogsInDb.find((b) => b.title === 'Test Blog')
  assert.ok(addedBlog)
  assert.strictEqual(addedBlog.title, newBlog.title)
  assert.strictEqual(addedBlog.author, newBlog.author)
  assert.strictEqual(addedBlog.url, newBlog.url)
  assert.strictEqual(addedBlog.likes, newBlog.likes)
})

test('likes default to 0 when missing from new blog', async () => {
  const newBlog = {
    title: 'Blog with Missing Likes',
    author: 'Test Author',
    url: 'blog-missing-likes.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const savedBlog = response.body
  assert.strictEqual(savedBlog.likes, 0, 'likes should default to 0')
})

test('backend responds with 400 if title is missing', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'test-url.com',
    likes: 7,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('backend responds with 400 if url is missing', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    likes: 7,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await Blog.find({})

  const blogToDelete = blogsAtStart[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

  const contents = blogsAtEnd.map((r) => r.title)
  assert.ok(
    !contents.includes(blogToDelete.title),
    'the deleted blog should not be in the list'
  )
})

test('returns 404 when trying to delete a non-existent blog', async () => {
  const nonExistentId = '5e9f8f8f8f8f8f8f8f8f8f8f' // An ID that doesn't exist
  await api.delete(`/api/blogs/${nonExistentId}`).expect(404)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await Blog.find({})

  const blogToUpdate = blogsAtStart[0]
  const updatedLikes = blogToUpdate.likes + 1

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: updatedLikes })
    .expect(200)

  const updatedBlog = response.body
  assert.strictEqual(updatedBlog.likes, updatedLikes)

  const blogsAtEnd = await Blog.find({})
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

  const contents = blogsAtEnd.map((r) => r.likes)
  assert.ok(
    contents.includes(updatedLikes),
    'updated likes should be in the list'
  )
})

test('returns 404 when trying to update a non-existent blog', async () => {
  const nonExistentId = '5e9f8f8f8f8f8f8f8f8f8f8f' // An ID that doesn't exist
  await api.put(`/api/blogs/${nonExistentId}`).send({ likes: 10 }).expect(404)
})

after(async () => {
  await mongoose.connection.close()
})
