import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  refetchSession: () => Promise<void>;
}

interface Wallet {
  amount: number;
  created_at: Date;
  currency: string;
  id: number;
  updated_at: Date;
  user_id: string;
}
