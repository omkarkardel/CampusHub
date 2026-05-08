import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setSession } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    interests: "",
    skills: ""
  });
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const payload = {
        ...form,
        role: "student",
        interests: form.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        skills: form.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      };

      const response = await signupRequest(payload);
      setSession(response.token, response.user);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <div className="auth-card__intro">
          <p>Get Started</p>
          <h1>Create your CampusHub account.</h1>
          <span>Register to join competitions, RSVP events, and build your team profile.</span>
        </div>
        <form className="auth-form auth-form--two-col" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
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
          <input type="text" value="Student" disabled aria-label="Role" />
          <input
            type="text"
            placeholder="Interests (comma separated)"
            value={form.interests}
            onChange={(e) => setForm((prev) => ({ ...prev, interests: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={(e) => setForm((prev) => ({ ...prev, skills: e.target.value }))}
          />
          {error ? <p className="auth-form__error auth-form__error--full">{error}</p> : null}
          <button type="submit" className="btn btn--primary auth-form__button auth-form__button--full">
            Create account
          </button>
          <p className="auth-form__text auth-form__text--full">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
