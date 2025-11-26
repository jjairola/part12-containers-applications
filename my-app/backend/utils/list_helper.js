const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favorite = blogs[0];

  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }

  return favorite;
};

const mostBlogs = (blogs) => {
  // Implementation goes here

  const authorBlogCount = {};

  blogs.forEach((blog) => {
    if (authorBlogCount[blog.author]) {
      authorBlogCount[blog.author] += 1;
    } else {
      authorBlogCount[blog.author] = 1;
    }
  });

  const sortedAuthors = Object.entries(authorBlogCount).sort(
    (a, b) => b[1] - a[1],
  );

  if (sortedAuthors.length === 0) {
    return null;
  }

  return {
    author: sortedAuthors[0][0],
    blogs: sortedAuthors[0][1],
  };
};

const mostLikes = (blogs) => {
  const authorLikesCount = {};

  blogs.forEach((blog) => {
    if (authorLikesCount[blog.author]) {
      authorLikesCount[blog.author] += blog.likes;
    } else {
      authorLikesCount[blog.author] = blog.likes;
    }
  });

  const sortedAuthors = Object.entries(authorLikesCount).sort(
    (a, b) => b[1] - a[1],
  );

  if (sortedAuthors.length === 0) {
    return null;
  }

  return {
    author: sortedAuthors[0][0],
    likes: sortedAuthors[0][1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
