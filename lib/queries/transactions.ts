import { createClient } from "@/lib/supabase/server";
import type { Transaction, TransactionWithCategory } from "@/lib/types";

export async function getTransactions(): Promise<TransactionWithCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(`
    *,
    category:categories(name, color, type)
  `)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

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
