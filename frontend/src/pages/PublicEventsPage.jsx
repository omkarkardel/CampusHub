import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { publicEvents } from "../data/publicContent";

const FILTERS = ["All", "This Week", "Tech", "Culture", "Free"];
const SORTS = ["Soonest", "Most Popular", "Recently Added"];

const categoryTone = {
  Innovation: "event-pill event-pill--innovation",
  Culture: "event-pill event-pill--culture",
  Tech: "event-pill event-pill--tech",
  Sustainability: "event-pill event-pill--sustainability"
};

const getEventKey = (event) => `${event.title}-${event.date}`;

const getEventDomId = (event) =>
  `event-details-${getEventKey(event).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

const PublicEventsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Soonest");
  const [expandedEventKey, setExpandedEventKey] = useState("");

  const visibleEvents = useMemo(() => {
    let list = [...publicEvents];

    if (activeFilter === "Tech") {
      list = list.filter((item) => item.category === "Tech");
    } else if (activeFilter === "Culture") {
      list = list.filter((item) => item.category === "Culture");
    } else if (activeFilter === "Free") {
      list = list.filter((item) => item.isFree);
    } else if (activeFilter === "This Week") {
      list = list.slice(0, 3);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((item) => item.title.toLowerCase().includes(q));
    }

    if (sortBy === "Most Popular") {
      list.sort((a, b) => (b.seats || 0) - (a.seats || 0));
    } else if (sortBy === "Recently Added") {
      list = list.reverse();
    }

    return list;
  }, [activeFilter, search, sortBy]);

  useEffect(() => {
    setExpandedEventKey("");
  }, [activeFilter, search, sortBy]);

  const onToggleDetails = (event) => {
    const key = getEventKey(event);
    setExpandedEventKey((prev) => (prev === key ? "" : key));
  };

  return (
    <main className="public-page">
      <section className="public-banner public-banner--events">
        <div className="public-banner__content">
          <p className="public-banner__eyebrow">Upcoming Events</p>
          <h1>Campus events you can preview right now.</h1>
          <p>Browse what is happening this month. To book your seat, create an account and join in.</p>

          <div className="events-hero-stats">
            <article>
              <strong>24</strong>
              <span>This month</span>
            </article>
            <article>
              <strong>540+</strong>
              <span>Open seats</span>
            </article>
            <article>
              <strong>7</strong>
              <span>New this week</span>
            </article>
          </div>
        </div>

        <div className="public-banner__cta-wrap">
          <Link to="/register" className="btn btn--primary">
            Register to Attend
          </Link>
          <Link to="/explore" className="btn btn--text">
            Browse Categories
          </Link>
        </div>
      </section>

      <section className="events-toolbar">
        <div className="events-filters">
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

        <div className="events-controls">
          <input
            className="events-search"
            placeholder="Search events by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="events-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="event-list">
        {visibleEvents.length === 0 ? (
          <article className="event-empty">
            <h3>No events match these filters</h3>
            <p>Try another filter or clear search to see all events.</p>
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
          visibleEvents.map((event) => {
            const eventKey = getEventKey(event);
            const isExpanded = expandedEventKey === eventKey;
            const detailsId = getEventDomId(event);

            return (
              <article key={eventKey} className="event-item event-item--v2">
                <div className="event-item__date-card">
                  <p className="event-item__date">{event.date}</p>
                </div>

                <div className="event-item__content">
                  <h3>{event.title}</h3>
                  <p className="event-item__meta">
                    {event.time} • {event.venue}
                  </p>
                  <p>{event.description}</p>

                  {isExpanded ? (
                    <div id={detailsId} className="event-item__details">
                      <p>
                        <strong>Available seats:</strong> {event.seats ?? "TBA"}
                      </p>
                      <p>
                        <strong>Entry:</strong> {event.isFree ? "Free" : "Paid"}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="event-item__side">
                  <span className={categoryTone[event.category] || "event-pill"}>{event.category}</span>
                  <button
                    type="button"
                    className="btn btn--ghost btn--small"
                    onClick={() => onToggleDetails(event)}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

export default PublicEventsPage;