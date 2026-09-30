import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

  }

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      await loginUser(form);

      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.detail ||
        "Login failed"
      );

    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>🐛 BugLens</h1>

        <h2>Welcome back</h2>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;