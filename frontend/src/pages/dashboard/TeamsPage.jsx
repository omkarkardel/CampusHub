import { useEffect, useState } from "react";
import TeamCard from "../../components/dashboard/TeamCard";
import { createTeam, fetchTeams, fetchTeammateSuggestions, joinTeam } from "../../services/teamService";
import { fetchEvents } from "../../services/eventService";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState({ name: "", event: "", requiredSkills: "" });

  const loadTeams = async () => {
    const [teamsRes, eventsRes] = await Promise.all([fetchTeams(), fetchEvents()]);
    setTeams(teamsRes.teams || []);
    setEvents(eventsRes.events || []);
  };

  useEffect(() => {
    loadTeams().catch(() => undefined);
  }, []);

  const onCreate = async (event) => {
    event.preventDefault();
    await createTeam({
      name: form.name,
      event: form.event,
      requiredSkills: form.requiredSkills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    });
    setForm({ name: "", event: "", requiredSkills: "" });
    await loadTeams();
  };

  const onJoin = async (teamId) => {
    await joinTeam(teamId);
    await loadTeams();
  };

  const loadSuggestions = async (eventId) => {
    const res = await fetchTeammateSuggestions(eventId);
    setSuggestions(res.suggestions || []);
  };

  return (
    <div className="space-y-4">
      <section className="card p-4">
        <h2 className="text-xl font-semibold">Team Formation</h2>
        <form className="mt-3 grid gap-2 md:grid-cols-4" onSubmit={onCreate}>
          <input
            placeholder="Team name"
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <select
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            value={form.event}
            onChange={(e) => {
              const eventId = e.target.value;
              setForm((prev) => ({ ...prev, event: eventId }));
              if (eventId) loadSuggestions(eventId).catch(() => undefined);
            }}
            required
          >
            <option value="">Select event</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title}
              </option>
            ))}
          </select>
          <input
            placeholder="Required skills (csv)"
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: "var(--campus-border)" }}
            value={form.requiredSkills}
            onChange={(e) => setForm((prev) => ({ ...prev, requiredSkills: e.target.value }))}
          />
          <button type="submit" className="rounded-lg bg-emerald-500 px-3 py-2 text-white">
            Create Team
          </button>
        </form>
        {suggestions.length > 0 ? (
          <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "var(--campus-border)" }}>
            <h3 className="font-semibold">AI teammate suggestions</h3>
            <div className="mt-2 space-y-1 text-sm">
              {suggestions.map((item) => (
                <p key={`${item.teamId}-${item.userId}`}>
                  {item.name} ({item.matchingSkills.join(", ")}) in {item.teamName}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {teams.map((team) => (
          <TeamCard key={team._id} team={team} onJoin={onJoin} />
        ))}
      </section>
    </div>
  );
};

export default TeamsPage;