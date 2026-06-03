import { getCurrentMonthRange, toDateString } from "../format";
import { createClient } from "../supabase/server";
import type { CategoryStats, MonthlyStats } from "../types";

// 이번 달 카테고리별 지출 조회
// TODO: CategorySection, TopCategoriesSection에서 중복 호출됨 — React cache()로 dedup 필요
export async function getMonthlyCategoryStats(): Promise<CategoryStats[]> {
  const supabase = await createClient();
  const { start, end } = getCurrentMonthRange();

  const { data, error } = await supabase
    .from("transactions")
    .select(`amount, category:categories(id, name, icon, color)`)
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
        count: existing.count + 1,
      });
    } else {
      statsMap.set(category.id, {
        category_id: category.id,
        category_color: category.color,
        category_name: category.name,
        category_icon: category.icon,
        total: Number(transaction.amount),
        count: 1,
      });
    }
  }

  return Array.from(statsMap.values()).sort((a, b) => b.total - a.total);
}

export async function getRecentMonthsStats(months: number = 6): Promise<MonthlyStats[]> {
  const supabase = await createClient();

  const now = new Date(2026, 4, 15); // TODO: 임시, 나중에 new Date()로 복원
  const startDate = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  const startDateString = toDateString(startDate);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type, date")
    .gte("date", startDateString);

  if (error) {
    console.error("월별 통계 조회 실패: ", error);
    return [];
  }

  // 월별 빈 데이터 초기화 (거래 없는 달도 표시)
  const monthsMap = new Map<string, MonthlyStats>();
  for (let i = 0; i < months; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = `${date.getMonth() + 1}월`;

    monthsMap.set(monthKey, {
      month: monthKey,
      monthLabel,
      income: 0,
      expense: 0,
    });
  }

  // 거래 데이터를 월별로 합산
  for (const transaction of data) {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    const monthStats = monthsMap.get(monthKey);
    if (!monthStats) continue;

    const amount = Number(transaction.amount);
    if (transaction.type === "income") {
      monthsMap.set(monthKey, { ...monthStats, income: monthStats.income + amount });
    } else {
      monthsMap.set(monthKey, { ...monthStats, expense: monthStats.expense + amount });
    }
  }

  return Array.from(monthsMap.values()).sort((a, b) => a.month.localeCompare(b.month));
}

// 임의의 년/월 통계 함수
export async function getMonthSummary(
  year: number,
  month: number,
): Promise<{ income: number; expense: number }> {
  const supabase = await createClient();

  // 해당 월의 시작/끝
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  const startDate = toDateString(startOfMonth);
  const endDate = toDateString(endOfMonth);

  const { data, error } = await supabase
    .from("transactions")
    .select("type, amount")
    .gte("date", startDate)
    .lte("date", endDate);

  if (error) {
    console.error("월 통계 조회 실패:", error);
    return { income: 0, expense: 0 };
  }

  const income = data
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = data
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return { income, expense };
}

// 이번 달 통계 함수
export async function getCurrentMonthSummary() {
  const now = new Date(2026, 4, 15); // TODO: 임시, 나중에 new Date()로 복원
  return getMonthSummary(now.getFullYear(), now.getMonth() + 1);
}

// 이번 달 + 전월 비교 함수
export async function getMonthlyComparison() {
  const now = new Date(2026, 4, 15); // TODO: 임시, 나중에 new Date()로 복원
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // 전월 계산
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;

  const [current, previous] = await Promise.all([
    getMonthSummary(year, month),
    getMonthSummary(prevYear, prevMonth),
  ]);

  return { current, previous };
}

// 최근 N개월의 월별 통계
export async function getMonthlySummaries(
  monthCount: number,
): Promise<Array<{ year: number; month: number; income: number; expense: number }>> {
  const now = new Date(2026, 4, 15); // TODO: 임시, 나중에 new Date()로 복원

  const months = [];
  for (let i = monthCount - 1; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;

    months.push({ year, month });
  }

  const summaries = await Promise.all(
    months.map(({ year, month }) => getMonthSummary(year, month)),
  );

  return months.map((m, index) => ({
    year: m.year,
    month: m.month,
    income: summaries[index].income,
    expense: summaries[index].expense,
  }));
}
