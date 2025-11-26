import { useParams } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';

const User = () => {
  const { id } = useParams();
  const { users } = useUsers();

  const user = users.find(u => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title} by {blog.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;