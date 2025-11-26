import { useMemo } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useBlogs } from "./context/BlogsContext";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import BlogListItem from "./components/BlogListItem";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { blogs } = useBlogs();
  const { user } = useAuth();

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  return (
    <div>
      <Menu />

      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2>blogs</h2>
              {user && (
                <Togglable buttonLabel="new blog">
                  <BlogForm />
                </Togglable>
              )}
              {sortedBlogs.map((blog) => (
                <BlogListItem key={blog.id} blog={blog} />
              ))}
            </>
          }
        />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
