import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { competitions } from "../data/publicContent";

const FILTERS = ["All", "Team", "Solo", "Tech", "Design", "Sports", "Free"];
const SORTS = ["Highest Prize", "Deadline", "Seats Left"];

const formatPrize = (value) => {
  return "$" + Number(value || 0).toLocaleString();
};

const getCardKey = (item) => item.name + "-" + item.deadline;

const CompetitionsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Highest Prize");
  const [search, setSearch] = useState("");
  const [expandedKey, setExpandedKey] = useState("");

  const filteredCompetitions = useMemo(() => {
    let list = competitions.slice();

    if (activeFilter === "Team") {
      list = list.filter((item) => item.mode.toLowerCase().indexOf("team") !== -1);
    } else if (activeFilter === "Solo") {
      list = list.filter((item) => item.mode.toLowerCase().indexOf("solo") !== -1);
    } else if (activeFilter === "Tech" || activeFilter === "Design" || activeFilter === "Sports") {
      list = list.filter((item) => item.category === activeFilter);
    } else if (activeFilter === "Free") {
      list = list.filter((item) => item.isFree);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().indexOf(q) !== -1);
    }

    if (sortBy === "Highest Prize") {
      list.sort((a, b) => Number(b.prize || 0) - Number(a.prize || 0));
    } else if (sortBy === "Seats Left") {
      list.sort((a, b) => Number(a.seatsLeft || 0) - Number(b.seatsLeft || 0));
    } else if (sortBy === "Deadline") {
      list.sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)));
    }

    return list;
  }, [activeFilter, search, sortBy]);

  const totalPrizePool = useMemo(() => {
    return competitions.reduce((sum, item) => sum + Number(item.prize || 0), 0);
  }, []);

  const onToggleCard = (item) => {
    const key = getCardKey(item);
    setExpandedKey((prev) => (prev === key ? "" : key));
  };

  return (
    <main className="public-page">
      <section className="public-banner public-banner--competitions">
        <div className="public-banner__content">
          <p className="public-banner__eyebrow">Competition Zone</p>
          <h1>Compete, collaborate, and represent your campus.</h1>
          <p>From coding battles to sports and design leagues, find competitions where your team can stand out.</p>

          <div className="competitions-hero-stats">
            <article>
              <strong>{competitions.length}</strong>
              <span>Open competitions</span>
            </article>
            <article>
              <strong>{formatPrize(totalPrizePool)}</strong>
              <span>Total prize pool</span>
            </article>
            <article>
              <strong>7 days</strong>
              <span>Avg. prep window</span>
            </article>
          </div>
        </div>

        <div className="public-banner__cta-wrap">
          <Link to="/register" className="btn btn--primary">Create Team Profile</Link>
          <Link to="/explore" className="btn btn--text">Browse event tracks</Link>
        </div>
      </section>

      <section className="competitions-toolbar">
        <div className="competitions-filters">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              className={item === activeFilter ? "chip chip--active" : "chip"}
              onClick={() => setActiveFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="competitions-controls">
          <input
            className="competitions-search"
            placeholder="Search competition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="competitions-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORTS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="competition-grid">
        {filteredCompetitions.length === 0 ? (
          <article className="competition-empty">
            <h3>No competitions found</h3>
            <p>Try another filter or clear search.</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setActiveFilter("All");
                setSearch("");
              }}
            >
              Reset filters
            </button>
          </article>
        ) : (
          filteredCompetitions.map((competition) => {
            const key = getCardKey(competition);
            const isExpanded = expandedKey === key;

            return (
              <article
                key={key}
                className={"competition-card competition-card--v2" + (isExpanded ? " is-open" : "")}
              >
                <div className="competition-card__top">
                  <h3>{competition.name}</h3>
                  <span className="competition-badge">{competition.category}</span>
                </div>

                <p>{competition.description}</p>

                <div className="competition-card__meta">
                  <span>{competition.mode}</span>
                  <strong>{formatPrize(competition.prize)}</strong>
                </div>

                <button
                  type="button"
                  className="btn btn--ghost btn--small"
                  onClick={() => onToggleCard(competition)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Hide Details" : "View Details"}
                </button>

                {isExpanded ? (
                  <div className="competition-card__details">
                    <p><strong>Deadline:</strong> {competition.deadline}</p>
                    <p><strong>Level:</strong> {competition.level}</p>
                    <p><strong>Seats Left:</strong> {competition.seatsLeft}</p>
                    <p><strong>Fee:</strong> {competition.isFree ? "Free Entry" : "Paid Entry"}</p>
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

export default CompetitionsPage;