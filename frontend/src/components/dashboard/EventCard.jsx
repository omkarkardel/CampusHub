const EventCard = ({ event, onRegister, actionLabel = "Register" }) => (
  <article className="card p-4 transition hover:-translate-y-0.5">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <span className="rounded-full bg-teal-500/20 px-2 py-1 text-xs">{event.category}</span>
    </div>
    <p className="mt-2 text-sm" style={{ color: "var(--campus-muted)" }}>
      {event.description}
    </p>
    <div className="mt-3 text-xs" style={{ color: "var(--campus-muted)" }}>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.venue}</p>
      <p>{event.club?.name || "Club"}</p>
    </div>
    {onRegister ? (
      <button
        type="button"
        onClick={() => onRegister(event._id || event.id)}
        className="mt-3 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white"
      >
        {actionLabel}
      </button>
    ) : null}
  </article>
);

export default EventCard;
