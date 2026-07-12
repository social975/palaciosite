import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <h1 className="font-display text-3xl text-wine">Page not found</h1>
      <p className="mt-3 text-sm text-ink-soft">
        That route doesn't exist yet in the Palacio app.
      </p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Back to Home
      </Link>
    </div>
  );
}
