const express = require('express')
const router = express.Router()
const blogsController = require('../controllers/blogs')

router.get('/', blogsController.getBlogs)
router.post('/', blogsController.createBlog)

module.exports = router