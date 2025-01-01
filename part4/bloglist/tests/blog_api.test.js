// blog_api.test.js
require('dotenv').config();
const mongoose = require('mongoose');
const { test, after, before, beforeEach } = require('node:test');
const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');  // Now pointing to app.js
const api = supertest(app);
const Blog = require('../models/blog');
const { blogs } = require('./test_helper');
const config = require('../utils/config'); // Make sure to import config if you're using it

before(async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogDocuments = blogs.map(blog => new Blog(blog));
  await Blog.insertMany(blogDocuments);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});