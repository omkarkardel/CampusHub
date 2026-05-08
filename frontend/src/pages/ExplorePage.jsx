import { Link } from "react-router-dom";
import { eventBackgrounds, exploreCards } from "../data/publicContent";

const cardActions = [
  { to: "/events", cta: "Discover" },
  { to: "/register", cta: "Build Teams" },
  { to: "/events", cta: "View Schedule" }
];

const ExplorePage = () => {
  return (
    <main className="public-page">
      <section className="public-banner">
        <div>
          <p className="public-banner__eyebrow">Explore CampusHub</p>
          <h1>See what your campus is building this season.</h1>
          <p>Preview events, clubs, and community spaces. Register to unlock participation and personalized updates.</p>
        </div>
        <Link to="/register" className="btn btn--primary">
          Unlock Full Access
        </Link>
      </section>

      <section className="grid-cards">
        {exploreCards.map((card, index) => {
          const action = cardActions[index] || { to: "/explore", cta: "Explore" };

          return (
            <Link key={card.title} to={action.to} className="feature-card feature-card--link">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="feature-card__action">{action.cta}</span>
            </Link>
          );
        })}
      </section>

      <section className="parallax-strip">
        {eventBackgrounds.map((image) => (
          <div key={image} className="parallax-strip__item">
            <img src={image} alt="Campus moments" loading="lazy" />
          </div>
        ))}
      </section>
    </main>
  );
};

export default ExplorePage;