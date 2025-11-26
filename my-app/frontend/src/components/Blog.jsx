import { useParams } from "react-router-dom";
import { useBlogs } from "../context/BlogsContext";
import { useAuth } from "../context/AuthContext";
import Comments from "./Comments";

const Blog = () => {
  const { blogs, updateBlog, deleteBlog, setNotification } = useBlogs();
  const params = useParams();
  const { user } = useAuth();
  const blog = blogs.find((b) => b.id === params.id);

  const showDelete = user && blog.user.username === user.username;

  const handleLike = async (blog) => {
    try {
      const newObject = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      await updateBlog({ id: blog.id, newObject: newObject });
    } catch (exception) {
      setNotification(
        exception.response.data.error ||
          "An error occurred while liking the blog",
        "error",
      );
    }
  };

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteBlog(blog.id);
      setNotification(
        `Blog ${blog.title} by ${blog.author} removed`,
        "success",
      );
    } catch (exception) {
      setNotification(
        exception.response.data.error ||
          "An error occurred while deleting the blog",
        "error",
      );
    }
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {showDelete && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
      <Comments blog={blog} />
    </div>
  );
};
export default Blog;
