import { useMemo, useState } from "react";
import { useBlogs } from "../context/BlogsContext";
import { useNotification } from "../context/NotificationContext";

const Comments = ({ blog }) => {
  const [newComment, setNewComment] = useState("");
  const { setNotification } = useNotification();
  const { updateBlog } = useBlogs();

  const comments = useMemo(() => {
    return blog.comments || [];
  }, [blog.comments]);

  const handleAddComment = async () => {
    try {
      const updatedBlog = {
        ...blog,
        user: blog.user.id,
        comments: blog.comments ? [...blog.comments, newComment] : [newComment],
      };
      await updateBlog({ id: blog.id, newObject: updatedBlog });
      setNewComment("");
      setNotification("Comment added", "success");
    } catch (exception) {
      setNotification(
        exception.response?.data?.error ||
          "An error occurred while adding comment",
        "error",
      );
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add comment</button>
      </div>
      <ul>
        {comments && comments.map((c, index) => <li key={index}>{c}</li>)}
      </ul>
    </div>
  );
};

export default Comments;
