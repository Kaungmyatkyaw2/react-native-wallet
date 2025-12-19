import { Session } from "@supabase/supabase-js";

type RecordType = "INCOME" | "EXPENSE";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
  refetchSession: () => Promise<void>;
}

interface Wallet {
  id: number;

  amount: number;
  created_at: Date;
  currency: string;
  updated_at: Date;
  user_id: string;
}

interface Category {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  type: RecordType;
  user_id: string;
  color: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  created_at: Date;
}

interface IRecord {
  id: number;
  amount: number;
  title: string;
  created_at: string;
  updated_at: Date;
  type: RecordType;
  user_id: string;
  wallet_id: number;
  category_id: number;
  payment_method_id: number;
  category?: Category;
  payment_method?: PaymentMethod;
}

interface PaginationParams {
  limit?: number;
  page?: number;
  sort_by?: string;
  sort_dir?: string;
  q?: string;
}
