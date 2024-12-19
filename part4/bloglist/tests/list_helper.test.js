const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// Define the blogs list once as a global variable for the module
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

test('dummy returns one', () => {
  const result = listHelper.dummy();
  assert.strictEqual(result, 1)
})

test('of empty list is zero', () => {
  const result = listHelper.totalLikes([]);
  assert.strictEqual(result, 0);
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogs[0]]; // Using the first blog from our list
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 7);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 7 + 5 + 12 + 10 + 0 + 2); // Sum of all likes from the list
  });
});

describe('favorite blog', () => {
  test('of empty list returns undefined', () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, undefined);
  });

  test('when list has only one blog, returns that blog', () => {
    const listWithOneBlog = [blogs[0]];
    const result = listHelper.favoriteBlog(listWithOneBlog);
    console.log('Result with single blog list:', result);
    assert.deepStrictEqual(result, {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    });
  });

  test('of many blogs returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });

  test('when there are multiple favorites, returns one of them', () => {
    // Create a modified list where two blogs have the same max likes
    const listWithTwoFavorites = [
      ...blogs.slice(0, 2), // Keep the first two blogs as they are
      { ...blogs[2], likes: 10 }, // Change the third blog's likes to match the first
      ...blogs.slice(3) // Keep the rest of the blogs
    ];
    const result = listHelper.favoriteBlog(listWithTwoFavorites);
    console.log('Result with multiple favorites:', result);
    assert.ok(result.likes === 10); // Expecting one of the blogs with 10 likes to be returned
  });
});


describe('most blogs', () => {
  test('of empty list returns undefined', () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, undefined);
  });

  test('when list has only one blog, equals the author of that blog', () => {
    const listWithOneBlog = [blogs[0]];
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Michael Chan",
      blogs: 1
    });
  });

  test('of many blogs returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    });
  });

  test('when there are multiple authors with the same most blogs, returns one of them', () => {
    // Modify the list to have two authors with the same number of blogs
    const listWithTwoTopBloggers = [
      ...blogs.slice(0, 2),
      { ...blogs[2], author: "Another Author" }, // Change the author of the third blog
      { ...blogs[3], author: "Yet Another Author" }, // Change the author of the fourth blog to another name
      ...blogs.slice(4)
    ];
    const result = listHelper.mostBlogs(listWithTwoTopBloggers);
    console.log('Result for multiple top bloggers:', result);
    // Both "Another Author" and "Yet Another Author" should now have 2 blogs each
    assert.ok(result.blogs === 2);
  });
});



describe('most likes', () => {
  test('of empty list returns undefined', () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, undefined);
  });

  test('when list has only one blog, equals the likes of that blog', () => {
    const listWithOneBlog = [blogs[0]];
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Michael Chan",
      likes: 7
    });
  });

  test('of many blogs returns the author with most likes', () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17  // Sum of likes for Edsger W. Dijkstra's blogs (5 + 12)
    });
  });

  test('when there are multiple authors with the same most likes, returns one of them', () => {
    // Modify the list so that two authors have the same number of total likes
    const listWithTwoTopLiked = [
      ...blogs.slice(0, 2),
      { ...blogs[2], author: "Another Author", likes: 5 }, // Change author and likes for third blog
      { ...blogs[3], author: "Another Author", likes: 12 }, // Change author and likes for fourth blog
      ...blogs.slice(4)
    ];
    const result = listHelper.mostLikes(listWithTwoTopLiked);
    console.log('Result with multiple authors with the same most likes:', result);
    assert.ok(result.likes === 17); // Both "Another Author" and "Edsger W. Dijkstra" should have 17 likes now
  });
});





