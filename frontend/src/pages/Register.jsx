import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

      await registerUser(form);

      navigate("/login");

    } catch (error) {

      setError(
        error.response?.data?.detail ||
        "Registration failed"
      );

    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>🐛 BugLens</h1>

        <h2>Create account</h2>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            Create Account
          </button>

        </form>

        <p>
          Already registered?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;