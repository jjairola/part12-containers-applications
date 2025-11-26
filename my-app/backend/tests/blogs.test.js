const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../utils/test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("test blogs", () => {
  let token;
  let user_id;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    if (!token) {
      const auth = await helper.getAuth(api, helper.initialUsers[0]);
      token = auth.token;
      user_id = auth.user_id;
    }
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // Tehtävä 4.8
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  // Tehtävä 4.9
  test("blog identifier field is named id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
      assert.strictEqual(blog.__v, undefined);
    });
  });

  test("adds blog correctly", async () => {
    const newBlog = {
      title: "Testaaminen on kivaa",
      author: "Mr Tester",
      url: "http://blog.testaajantarinat.com/testaaminen.html",
      likes: 2,
    };

    const { body: created } = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const blog = await helper.blogInDb(created["id"]);
    delete blog["id"];
    delete blog["user"];

    assert.deepStrictEqual(blog, newBlog);
  });

  // test returns 401 when token is not provided
  test("adding a blog fails with 401 if token is not provided", async () => {
    const newBlog = {
      title: "Testaaminen on kivaa",
      author: "Mr Tester",
      url: "http://blog.testaajantarinat.com/testaaminen.html",
      likes: 2,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test("if likes property is missing, it will default to 0", async () => {
    const newBlog = {
      title: "Testaaminen on kivaa",
      author: "Mr Tester",
      url: "http://blog.testaajantarinat.com/testaaminen.html",
    };

    const { body: created } = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blog = await helper.blogInDb(created["id"]);
    delete blog["id"];
    delete blog["user"];

    assert.deepStrictEqual(blog, { ...newBlog, likes: 0 });
  });

  test("blog without title or url is not added", async () => {
    const newBlog = {
      author: "Mr Tester",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test("adds and deletes a blog successfully", async () => {
    const newBlog = {
      title: "Testaaminen on kivaa",
      author: "Mr Tester",
      url: "http://blog.testaajantarinat.com/testaaminen.html",
      likes: 2,
    };

    const { body: created } = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    await api
      .delete(`/api/blogs/${created["id"]}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAfterDelete = await helper.blogsInDb();
    assert.strictEqual(blogsAfterDelete.length, helper.initialBlogs.length);
  });

  // adds block but fails to delete because not token
  test("adding a blog and failing to delete it without token", async () => {
    const newBlog = {
      title: "Testaaminen on kivaa",
      author: "Mr Tester",
      url: "http://blog.testaajantarinat.com/testaaminen.html",
      likes: 2,
    };

    const { body: created } = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    await api.delete(`/api/blogs/${created["id"]}`).expect(401);

    const blogsAfterDeleteAttempt = await helper.blogsInDb();
    assert.strictEqual(
      blogsAfterDeleteAttempt.length,
      helper.initialBlogs.length + 1,
    );
  });

  test("updates a blog successfully", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlogData = {
      likes: blogToUpdate["likes"] + 1,
    };

    const { body: updatedBlog } = await api
      .put(`/api/blogs/${blogToUpdate["id"]}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlogData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(updatedBlog.likes, blogToUpdate["likes"] + 1);
  });
});

after(async () => {
  await mongoose.connection.close();
});
