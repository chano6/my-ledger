import { getCurrentMonthRange } from "../format";
import { createClient } from "../supabase/server";
import type { CategoryStats, MonthlySummary } from "../types";

// 이번 달 카테고리별 지출 조회
export async function getMonthlyCategoryStats(): Promise<CategoryStats[]> {
  const supabase = await createClient();
  const { start, end } = getCurrentMonthRange();

  const { data, error } = await supabase
    .from("transactions")
    .select(`amount, category:categories(id, name, color)`)
    .eq("type", "expense")
    .gte("date", start)
    .lte("date", end);

  if (error) {
    console.error("통계 조회 실패: ", error);
    return [];
  }

  const statsMap = new Map<string, CategoryStats>();

  for (const transaction of data) {
    const category = Array.isArray(transaction.category)
      ? transaction.category[0]
      : transaction.category;

    if (!category) continue;

    const existing = statsMap.get(category.id);
    if (existing) {
      statsMap.set(category.id, {
        ...existing,
        total: existing.total + Number(transaction.amount),
      });
    } else {
      statsMap.set(category.id, {
        category_id: category.id,
        category_color: category.color,
        category_name: category.name,
        total: Number(transaction.amount),
      });
    }
  }

  return Array.from(statsMap.values()).sort((a, b) => b.total - a.total);
}

// 이번 달 통계 함수
export async function getCurrentMonthSummary(): Promise<MonthlySummary> {
  const supabase = await createClient();
  const { start, end } = getCurrentMonthRange();

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type")
    .gte("date", start)
    .lte("date", end);

  if (error) {
    console.error("월별 요약 조회 실패:", error);
    return { income: 0, expense: 0, balance: 0 };
  }

  let income = 0;
  let expense = 0;

  for (const transaction of data) {
    const amount = Number(transaction.amount);
    if (transaction.type === "income") {
      income += amount;
    } else {
      expense += amount;
    }
  }

  return {
    income,
    expense,
    balance: income - expense,
  };
}
