const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const testHelper = require("../utils/test_helper");

describe("list helper tests", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([testHelper.initialBlogs[1]]);
    assert.strictEqual(result, 5);
  });

  test("when list has multiple blogs equals the sum of likes", () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs);
    assert.strictEqual(result, 36);
  });

  test("favorite blog returns the blog with most likes", () => {
    const result = listHelper.favoriteBlog(testHelper.initialBlogs);
    assert.deepStrictEqual(result, testHelper.initialBlogs[2]);
  });

  test("most blogs returns the author with most blogs", () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs);
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("most likes returns the author with most likes", () => {
    const result = listHelper.mostLikes(testHelper.initialBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
