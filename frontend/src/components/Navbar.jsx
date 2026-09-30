import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        🐛 BugLens
      </Link>

      <div className="nav-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/bugs">
          Bugs
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;