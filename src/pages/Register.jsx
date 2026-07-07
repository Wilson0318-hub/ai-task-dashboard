import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../api/authApi";


function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setErrorMessage("請完整填寫帳號、Email 與密碼");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      await registerUser({
        username,
        email,
        password
      });

      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);

      setErrorMessage("註冊失敗，帳號或 Email 可能已被使用。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form
        className="auth-card"
        onSubmit={handleRegister}
      >
        <h1 className="auth-title">
          註冊
        </h1>

        <p className="auth-subtitle">
          建立你的 AI Task Dashboard 帳號
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
          Email
          <input
            className="auth-input"
            type="email"
            placeholder="請輸入 email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          {isLoading ? "註冊中..." : "註冊"}
        </button>

        <p className="auth-footer-text">
          已經有帳號？{" "}
          <Link to="/login">
            前往登入
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;