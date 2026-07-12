import { create } from "zustand";

export type UserRole = "client" | "admin" | null;

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: UserRole;
  /** Placeholder setter — Phase 3 replaces this with a real Supabase session listener. */
  setSession: (userId: string | null, role: UserRole) => void;
  signOut: () => void;
}

/**
 * Phase 1 scaffold: no real session exists yet, so isAuthenticated always starts
 * false and every protected route redirects to /login. Phase 3 (Supabase backend)
 * wires this store to supabase.auth.onAuthStateChange so it reflects a real session.
 */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  role: null,
  setSession: (userId, role) =>
    set({ isAuthenticated: Boolean(userId), userId, role }),
  signOut: () => set({ isAuthenticated: false, userId: null, role: null }),
}));
