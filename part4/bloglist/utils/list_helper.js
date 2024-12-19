const _ = require('lodash');

const dummy = () => {
  return 1
}

// Returns the total number of likes across all blogs.
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined;

  const favorite = blogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current
    , { likes: -Infinity });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
};

// Returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined;

  const authors = _.countBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(Object.keys(authors), author => authors[author]);

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};