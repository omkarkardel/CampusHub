import { useState } from "react";
import { sendAnnouncement } from "../../services/clubService";

const AnnouncementsPage = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await sendAnnouncement(message);
    setMessage("");
    setStatus("Announcement sent to your club members.");
  };

  return (
    <section className="card p-4">
      <h2 className="text-xl font-semibold">Send Announcement</h2>
      <form className="mt-3 space-y-2" onSubmit={onSubmit}>
        <textarea
          className="min-h-40 w-full rounded-xl border px-3 py-2"
          style={{ borderColor: "var(--campus-border)" }}
          placeholder="Write a message for all your club members..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
          Send
        </button>
      </form>
      {status ? <p className="mt-2 text-sm text-emerald-600">{status}</p> : null}
    </section>
  );
};

export default AnnouncementsPage;