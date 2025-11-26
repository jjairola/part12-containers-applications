import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const LoginForm = ({ style, ...props }) => {
  const { login, logout, user } = useAuth();
  const { setNotification } = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login(username, password);
      console.log(user);

      setNotification(`Welcome back ${username}`, "success");
    } catch (exception) {
      setNotification(
        exception.response?.data?.error || "Invalid username or password",
        "error",
      );
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (user) {
    return (
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
    );
  }

  return (
    <div style={style}>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>

        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>

        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
