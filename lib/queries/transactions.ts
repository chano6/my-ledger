import { createClient } from "@/lib/supabase/server";
import type { Transaction, TransactionFilter, TransactionWithCategory } from "@/lib/types";

// biome-ignore lint/suspicious/noExplicitAny: Supabase 쿼리 빌더 타입이 복잡해 any로 단순화
function applyTransactionFilters(query: any, filter?: TransactionFilter) {
  let result = query;

  if (filter?.type) {
    result = result.eq("type", filter.type);
  }
  if (filter?.categoryId) {
    result = result.eq("category_id", filter.categoryId);
  }
  if (filter?.startDate) {
    result = result.gte("date", filter.startDate);
  }
  if (filter?.endDate) {
    result = result.lte("date", filter.endDate);
  }
  if (filter?.search) {
    result = result.ilike("description", `%${filter.search}%`);
  }

  return result;
}

export async function getTransactions(
  filter?: TransactionFilter,
): Promise<TransactionWithCategory[]> {
  const supabase = await createClient();

  let query = supabase.from("transactions").select(`
    *,
    category:categories(name, color, icon, type)
  `);

  query = applyTransactionFilters(query, filter);

  query = query.order("date", { ascending: false }).order("created_at", { ascending: false });

  if (filter?.limit) {
    query = query.limit(filter.limit);
  }

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

export async function getTransactionCount(filter?: TransactionFilter): Promise<number> {
  const supabase = await createClient();

  let query = supabase.from("transactions").select("*", { count: "exact", head: true });

  query = applyTransactionFilters(query, filter);

  const { count, error } = await query;

  if (error) {
    console.error("거래 개수 조회 실패: ", error);
    return 0;
  }

  return count ?? 0;
}

// 필터된 거래의 통계 (합계 + 건수)
export async function getTransactionsStats(filter?: TransactionFilter): Promise<{
  income: { total: number; count: number };
  expense: { total: number; count: number };
}> {
  const supabase = await createClient();

  let query = supabase.from("transactions").select("type, amount");

  query = applyTransactionFilters(query, filter);

  const { data, error } = await query;

  if (error) {
    console.error("거래 통계 조회 실패:", error);
    return {
      income: { total: 0, count: 0 },
      expense: { total: 0, count: 0 },
    };
  }

  const income = data.filter((t) => t.type === "income");
  const expense = data.filter((t) => t.type === "expense");

  return {
    income: {
      total: income.reduce((sum, t) => sum + Number(t.amount), 0),
      count: income.length,
    },
    expense: {
      total: expense.reduce((sum, t) => sum + Number(t.amount), 0),
      count: expense.length,
    },
  };
}
