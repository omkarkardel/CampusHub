const TeamCard = ({ team, onJoin }) => (
  <article className="card p-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">{team.name}</h3>
      <span className="text-xs" style={{ color: "var(--campus-muted)" }}>
        {team.members?.length || 0}/{team.maxMembers}
      </span>
    </div>
    <p className="mt-1 text-sm" style={{ color: "var(--campus-muted)" }}>
      Event: {team.event?.title || "General"}
    </p>
    <div className="mt-2 flex flex-wrap gap-1">
      {(team.requiredSkills || []).map((skill) => (
        <span key={skill} className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs">
          {skill}
        </span>
      ))}
    </div>
    {onJoin ? (
      <button
        type="button"
        className="mt-3 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-white"
        onClick={() => onJoin(team._id || team.id)}
      >
        Join Team
      </button>
    ) : null}
  </article>
);

export default TeamCard;