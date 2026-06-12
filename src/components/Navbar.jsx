import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link
        to="/"
        className="nav-brand"
      >
        AI Task Dashboard
      </Link>

      <div className="nav-menu">
        <Link
          to="/"
          className="nav-link"
        >
          Board
        </Link>

        <Link
          to="/analytics"
          className="nav-link"
        >
          Analytics
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;