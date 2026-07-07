import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { saveToken } from "../utils/authStorage";


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("請輸入帳號與密碼");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await loginUser({
        username,
        password
      });

      saveToken(data.access_token);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage("登入失敗，請確認帳號或密碼是否正確。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleLogin}
      >
        <h1 className="auth-title">
          登入
        </h1>

        <p className="auth-subtitle">
          登入 AI Task Dashboard
        </p>

        {errorMessage && (
          <div className="auth-error">
            {errorMessage}
          </div>
        )}

        <label className="auth-label">
          帳號
          <input
            className="auth-input"
            type="text"
            placeholder="請輸入 username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={isLoading}
          />
        </label>

        <label className="auth-label">
          密碼
          <input
            className="auth-input"
            type="password"
            placeholder="請輸入 password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
          />
        </label>

        <button
          className="auth-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "登入中..." : "登入"}
        </button>

        <p className="auth-footer-text">
          還沒有帳號？{" "}
          <Link to="/register">
            前往註冊
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;