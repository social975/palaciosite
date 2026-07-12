import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Intentionally a warning, not a thrown error: Phase 1 must still boot and
  // render the public marketing pages with no Supabase project configured yet.
  console.warn(
    "[Palacio] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Auth and data calls will fail until you copy .env.example to .env.local " +
      "and fill in your Supabase project's values."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
