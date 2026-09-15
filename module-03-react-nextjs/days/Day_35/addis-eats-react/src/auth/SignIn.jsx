import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./SignIn.css";

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    signIn();

    const destination = location.state?.from?.pathname || "/checkout";

    navigate(destination, { replace: true });
  }

  return (
    <section className="signin-page">
      <div className="signin-card">
        <h1>Sign In</h1>

        <p className="signin-description">
          Sign in to continue to checkout.
        </p>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-field">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="signin-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="signin-error">{error}</p>}

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;