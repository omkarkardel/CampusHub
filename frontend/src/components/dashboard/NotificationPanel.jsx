const NotificationPanel = ({ notifications = [], onRead }) => (
  <section className="card p-4 fade-up">
    <h3 className="text-lg font-semibold">Notification Center</h3>
    <div className="mt-3 space-y-2">
      {notifications.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--campus-muted)" }}>
          No notifications yet.
        </p>
      ) : (
        notifications.map((item) => (
          <div
            key={item._id || item.id}
            className="rounded-xl border p-3"
            style={{ borderColor: "var(--campus-border)" }}
          >
            <p className="text-sm">{item.message}</p>
            <p className="mt-1 text-xs" style={{ color: "var(--campus-muted)" }}>
              {new Date(item.createdAt).toLocaleString()}
            </p>
            {!item.isRead && onRead ? (
              <button
                type="button"
                className="mt-2 rounded-lg bg-slate-800 px-2 py-1 text-xs text-white dark:bg-slate-200 dark:text-slate-900"
                onClick={() => onRead(item._id || item.id)}
              >
                Mark as read
              </button>
            ) : null}
          </div>
        ))
      )}
    </div>
  </section>
);

export default NotificationPanel;