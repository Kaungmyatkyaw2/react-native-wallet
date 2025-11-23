import { supabase } from "@/lib/supabase";
import {
  Category,
  IRecord,
  PaginationParams,
  RecordType,
  Wallet,
} from "@/types/interfaces";

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

export const getAvailableCategories = async (type?: RecordType) => {
  const sessionResponse = await supabase.auth.getSession();

  if (sessionResponse.error) {
    throw new Error("You don't have permission to perform this action");
  }

  const userId = sessionResponse.data.session?.user.id;

  let query = supabase
    .from("categories")
    .select("*")
    .or(`isDefault.eq.true,user_id.eq.${userId}`);

  if (type) {
    query = query.eq("type", type);
  }

  const response = await query;

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (response.data.length === 0) {
    throw new Error("No categories found");
  }

  return response.data as Category[];
};

export const createRecord = async (
  payload: Omit<
    IRecord,
    "updated_at" | "created_at" | "id" | "wallet_id" | "user_id"
  >
) => {
  const wallet = await getMyWallet();

  const createRecordResponse = await supabase.from("records").insert([
    {
      amount: payload.amount,
      user_id: wallet.user_id,
      wallet_id: wallet.id,
      title: payload.title,
      category_id: payload.category_id,
      type: payload.type,
    },
  ]);

  if (createRecordResponse.error) {
    throw new Error(createRecordResponse.error.message);
  }

  const updateWalletResponse = await supabase
    .from("wallets")
    .update({
      amount:
        payload.type == "INCOME"
          ? wallet.amount + payload.amount
          : wallet.amount - payload.amount,
    })
    .eq("id", wallet.id)
    .eq("amount", wallet.amount);

  if (updateWalletResponse.error) {
    throw new Error(updateWalletResponse.error.message);
  }

  return createRecordResponse.data;
};

export const getLatestRecords = async (take: number) => {
  const wallet = await getMyWallet();

  const recordsResponse = await supabase
    .from("records")
    .select(
      `
      *,
      category:category_id (
        id,
        name
      )
    `
    )
    .eq("wallet_id", wallet.id)
    .limit(take)
    .order("created_at", { ascending: false });

  if (recordsResponse.error) {
    throw new Error(recordsResponse.error.message);
  }

  return recordsResponse.data as IRecord[];
};

export const getRecords = async ({
  limit = 10,
  page = 1,
  sort_by = "created_at",
  sort_dir = "desc",
}: PaginationParams) => {
  const wallet = await getMyWallet();

  const from = (page - 1) * limit;
  const to = from + limit + 1;

  const recordsResponse = await supabase
    .from("records")
    .select(
      `
      *,
      category:category_id (
        id,
        name
      )
    `
    )
    .eq("wallet_id", wallet.id)
    .range(from, to)
    .order(sort_by, { ascending: sort_dir == "asc" });

  if (recordsResponse.error) {
    throw new Error(recordsResponse.error.message);
  }

  return { nextPage: page + 1, data: recordsResponse.data as IRecord[] };
};
