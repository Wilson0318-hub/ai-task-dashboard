import { Link, useNavigate } from "react-router-dom";

import { isLoggedIn, removeToken } from "../utils/authStorage";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="navbar-logo"
      >
        AI Task Dashboard
      </Link>

      <div className="navbar-links">
        {isLoggedIn() ? (
          <>
            <Link
              to="/"
              className="navbar-link"
            >
              Board
            </Link>

            <Link
              to="/analytics"
              className="navbar-link"
            >
              Analytics
            </Link>

            <button
              className="navbar-logout-button"
              onClick={handleLogout}
            >
              登出
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="navbar-link"
            >
              登入
            </Link>

            <Link
              to="/register"
              className="navbar-link"
            >
              註冊
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;