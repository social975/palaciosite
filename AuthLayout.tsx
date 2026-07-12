import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-beige px-6">
      <div className="h-[3px] w-full bg-wine fixed top-0 left-0" />
      <Link to="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded bg-wine font-display text-white">
          P
        </span>
        <span className="font-display text-xl text-wine">Palacio</span>
      </Link>
      <div className="card w-full max-w-md p-8">
        <Outlet />
      </div>
    </div>
  );
}
