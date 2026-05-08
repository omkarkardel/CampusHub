import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/config";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await loginRequest(form);
      setSession(response.token, response.user);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card__intro">
          <p>Welcome Back</p>
          <h1>Login to continue your campus journey.</h1>
          <span>Track teams, events, and opportunities from one dashboard.</span>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          {error ? <p className="auth-form__error">{error}</p> : null}
          <button type="submit" className="btn btn--primary auth-form__button" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <a href={`${API_BASE_URL}/auth/google`} className="btn btn--ghost auth-form__button">
            Continue with Google
          </a>
          <p>
            New here? <Link to="/register">Create account</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
