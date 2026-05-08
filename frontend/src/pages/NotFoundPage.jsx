const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="card max-w-md p-6 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2" style={{ color: "var(--campus-muted)" }}>
        The page you requested was not found.
      </p>
    </div>
  </div>
);

export default NotFoundPage;