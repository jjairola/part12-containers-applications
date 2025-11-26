import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Menu = () => {
  const menuContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: "10px 20px",
  };
  const navContainer = {
    // display: "flex",

    // alignItems: "center",
    // backgroundColor: "#f0f0f0",
    // padding: "10px 20px",
  };

  return (
    <div style={menuContainer}>
      <nav style={navContainer}>
        <Link to="/" className="nav-link">
          Blogs
        </Link>
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </nav>
      <LoginForm />
    </div>
  );
};

export default Menu;
