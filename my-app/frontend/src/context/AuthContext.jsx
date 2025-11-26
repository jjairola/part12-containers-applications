import { createContext, useContext, useReducer, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "LOGIN", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (username, password) => {
    const user = await loginService.login({ username, password });
    if (!user) {
      throw new Error("Invalid username or password");
    }
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({ type: "LOGIN", payload: user });
    return user;
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
