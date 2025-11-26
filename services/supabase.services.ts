import { supabase } from "@/lib/supabase";
import {
  Category,
  IRecord,
  PaginationParams,
  PaymentMethod,
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

export const getPayments = async (type?: RecordType) => {
  const sessionResponse = await supabase.auth.getSession();

  if (sessionResponse.error) {
    throw new Error("You don't have permission to perform this action");
  }

  let query = supabase.from("payment_methods").select("*");

  const response = await query;

  if (response.error) {
    throw new Error(response.error.message);
  }

  if (response.data.length === 0) {
    throw new Error("No payments found");
  }

  return response.data as PaymentMethod[];
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
      payment_method_id: payload.payment_method_id,
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
      ),
      payment_method:payment_method_id (
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
  const to = from + limit - 1;

  const recordsResponse = await supabase
    .from("records")
    .select(
      `
      *,
      category:category_id (
        id,
        name
      ),
      payment_method:payment_method_id (
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

export const getCategoryExpensesForPieChart = async (type: RecordType) => {
  const wallet = await getMyWallet();

  const sessionResponse = await supabase.auth.getSession();
  if (sessionResponse.error) throw new Error("No permission");

  const userId = sessionResponse.data.session?.user.id;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let categoryQuery = supabase
    .from("categories")
    .select("id")
    .eq("type", type)
    .or(`isDefault.eq.true,user_id.eq.${userId}`);

  const { data: categories, error: categoryError } = await categoryQuery;

  if (categoryError) throw new Error(categoryError.message);
  if (!categories?.length) throw new Error("No categories found");

  const allowedCategoryIds = categories.map((cat) => cat.id);

  let query = supabase
    .from("records")
    .select(
      `
      amount,
      category_id,
          category:category_id (
        id,
        name,
        color
      )
    `
    )
    .eq("type", type)
    .in("category_id", allowedCategoryIds)
    .gte("created_at", startOfMonth.toISOString())
    .lte("created_at", endOfMonth.toISOString());

  if (wallet.id) {
    query = query.eq("wallet_id", wallet.id);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("No expenses found");

  const categoryMap = new Map();

  data?.forEach((record) => {
    const category = record.category as unknown as Category;
    if (!categoryMap.has(category.id)) {
      categoryMap.set(category.id, {
        id: category.id,
        name: category.name,
        totalAmount: 0,
        color: category.color,
      });
    }
    categoryMap.get(category.id).totalAmount += record.amount;
  });

  const categoriesWithTotals = Array.from(categoryMap.values());
  const totalAmount = categoriesWithTotals.reduce(
    (sum, cat) => sum + cat.totalAmount,
    0
  );

  const pieChartData = categoriesWithTotals.map((cat) => ({
    ...cat,
    percentage: Math.round((cat.totalAmount / totalAmount) * 100 * 100) / 100,
  }));

  return { data: pieChartData, totalAmount };
};

export interface CategoryStats {
  id: string;
  name: string;
  color: string;
  record_count: number;
  total_amount: number;
  percentage?: number;
}

export const getCategoriesWithStats = async (
  type?: "EXPENSE" | "INCOME"
): Promise<{
  data: CategoryStats[];
}> => {
  try {
    // Build the query
    let query = supabase
      .from("categories")
      .select(
        `
        id,
        name,
        color,
        records:records!inner(
          amount,
          type
        )
      `
      )
      .eq("type", type);

    if (type) {
      query = query.eq("records.type", type);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        data: [],
      };
    }

    // Calculate statistics for each category
    const categoriesWithStats: CategoryStats[] = data.map((category) => {
      const record_count = category.records?.length || 0;

      const total_amount =
        category.records?.reduce((sum, record) => {
          return sum + (record.amount || 0);
        }, 0) || 0;

      return {
        id: category.id,
        name: category.name,
        color: category.color,
        record_count,
        total_amount,
      };
    });

    // Calculate totals
    const totalAmount = categoriesWithStats.reduce((sum, category) => {
      return sum + category.total_amount;
    }, 0);

    const totalRecords = categoriesWithStats.reduce((sum, category) => {
      return sum + category.record_count;
    }, 0);

    // Calculate percentages
    const categoriesWithPercentage = categoriesWithStats.map((category) => ({
      ...category,
      percentage:
        totalAmount > 0
          ? Math.round((category.total_amount / totalAmount) * 100)
          : 0,
    }));

    return {
      data: categoriesWithPercentage,
    };
  } catch (error) {
    console.error("Error fetching categories with stats:", error);
    throw error;
  }
};
