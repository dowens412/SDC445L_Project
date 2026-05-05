import { createClient } from "@supabase/supabase-js";

const supabasURL = "https://huyzqofbyraxszqrcxyf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1eXpxb2ZieXJheHN6cXJjeHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MzMxNDYsImV4cCI6MjA5MjAwOTE0Nn0.d6mJ8inbPByiMEUd7xxh4A7XhzKzlUihIMrZ7ZBjDFw";

export const supaBase = createClient(supabasURL, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
