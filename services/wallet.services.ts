import { supabase } from "@/lib/supabase";
import { Wallet } from "@/types/interfaces";

export const getMyWallet: () => Promise<Wallet> = async () => {
  const sessionResponse = await supabase.auth.getSession();

  if (sessionResponse.error) {
    throw new Error("You don't have permission to perform this action");
  }

  const response = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", sessionResponse.data.session?.user.id);

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (response.data.length == 0) {
    throw new Error("Wallet not found");
  }

  return response.data[0] as Wallet;
};
