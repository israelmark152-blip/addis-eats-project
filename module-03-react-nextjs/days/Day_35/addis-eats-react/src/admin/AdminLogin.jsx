import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("addis-eats-admin", "true");
      navigate("/admin");
      return;
    }

    setError("Invalid admin username or password.");
  }

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <p className="admin-login-description">
          Sign in to manage Addis Eats.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-username">
              Username
            </label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter admin username"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-primary-button"
          >
            Sign In
          </button>
        </form>

        <p className="admin-demo-info">
          Demo login: admin / admin123
        </p>
      </div>
    </section>
  );
}

export default AdminLogin;