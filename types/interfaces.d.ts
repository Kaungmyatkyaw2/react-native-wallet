import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  refetchSession: () => Promise<void>;
}
