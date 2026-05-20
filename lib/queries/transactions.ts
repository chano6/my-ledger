import { createClient } from "@/lib/supabase/server";
import type { Transaction, TransactionFilter, TransactionWithCategory } from "@/lib/types";

export async function getTransactions(
  filter?: TransactionFilter,
): Promise<TransactionWithCategory[]> {
  const supabase = await createClient();

  let query = supabase.from("transactions").select(`
    *,
    category:categories(name, color, type)
  `);

  if (filter?.type) {
    query = query.eq("type", filter.type);
  }

  if (filter?.categoryId) {
    query = query.eq("category_id", filter.categoryId);
  }

  query = query.order("date", { ascending: false }).order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error("거래 조회 실패: ", error);
    return [];
  }

  return data as TransactionWithCategory[];
}

export async function getTransactionById(id: string): Promise<Transaction | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("transactions").select("*").eq("id", id).single();

  if (error) {
    console.error(`거래 조회 실패: `, error);
    return null;
  }

  return data as Transaction;
}
