import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore, type UserRole } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
  /** If set, the signed-in user's role must match one of these to render children. */
  allowedRoles?: UserRole[];
}

/**
 * Redirects to /login when there's no session, and to a "not authorized" state
 * when the signed-in role doesn't match. Phase 3 connects useAuthStore to a real
 * Supabase session; until then this always redirects, which is the correct and
 * honest behavior for a portal with no backend wired up yet.
 */
export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
