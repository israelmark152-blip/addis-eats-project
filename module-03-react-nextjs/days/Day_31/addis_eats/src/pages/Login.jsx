import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get path user was trying to visit, or default to home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name);
    navigate(from, { replace: true });
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "0.5rem" }}
          required
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
}