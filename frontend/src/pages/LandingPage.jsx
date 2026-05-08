import { Link } from "react-router-dom";
import { eventBackgrounds } from "../data/publicContent";

const LandingPage = () => {
  return (
    <main className="landing-page">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Campus Events and Competitions</p>
          <h1>Explore campus life that actually feels alive.</h1>
          <p className="hero__lead">
            CampusHub brings events, clubs, competitions, and student communities into one visual platform. Browse freely,
            then register to unlock personalized participation.
          </p>

          <div className="hero__actions">
            <Link to="/explore" className="btn btn--primary">
              Start Exploring
            </Link>
            <Link to="/register" className="btn btn--text">
              Register in 2 mins
            </Link>
          </div>

          <div className="hero__stats">
            <article className="hero__stat">
              <strong>120+</strong>
              <span>Live campus events</span>
            </article>
            <article className="hero__stat">
              <strong>48</strong>
              <span>Active communities</span>
            </article>
            <article className="hero__stat">
              <strong>9K+</strong>
              <span>Student participants</span>
            </article>
          </div>
        </div>

        <div className="hero__gallery">
          {eventBackgrounds.map((image, index) => (
            <article key={image} className={`hero__card hero__card--${index + 1}`}>
              <img src={image} alt="Campus event atmosphere" loading="lazy" />
            </article>
          ))}
        </div>
      </section>

      <section className="quick-links">
        <Link to="/events" className="quick-links__item">
          <p className="quick-links__kicker">Public Events</p>
          <h3>24 this month</h3>
          <span>View calendar</span>
        </Link>

        <Link to="/competitions" className="quick-links__item">
          <p className="quick-links__kicker">Active Competitions</p>
          <h3>12 open now</h3>
          <span>Join a challenge</span>
        </Link>

        <Link to="/login" className="quick-links__item">
          <p className="quick-links__kicker">Already Registered?</p>
          <h3>Continue where you left</h3>
          <span>Login</span>
        </Link>
      </section>

      <section className="cta-panel">
        <div>
          <h2>Want to join or compete?</h2>
          <p>Create your account to register for events, form teams, and manage your campus profile.</p>
        </div>
        <div className="cta-panel__actions">
          <Link to="/register" className="btn btn--primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn--ghost">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
