import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import { useBlogs } from "../context/BlogsContext";

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const { createBlog } = useBlogs();
  const { setNotification } = useNotification();

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    };
    try {
      await createBlog(blogObject);
      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        "success",
      );
    } catch (exception) {
      setNotification(
        exception.response.data.error ||
          "An error occurred while creating the blog",
        "error",
      );
    }
    setNewBlog("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
