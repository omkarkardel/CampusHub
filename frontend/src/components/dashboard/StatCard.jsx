const StatCard = ({ label, value, hint }) => (
  <div className="card p-4 fade-up">
    <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
      {label}
    </p>
    <p className="mt-2 text-2xl font-bold">{value}</p>
    {hint ? (
      <p className="mt-1 text-xs" style={{ color: "var(--campus-muted)" }}>
        {hint}
      </p>
    ) : null}
  </div>
);

export default StatCard;