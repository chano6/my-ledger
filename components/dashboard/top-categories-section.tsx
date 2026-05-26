import { getCurrentMonthDateRange } from "@/lib/format";
import { getMonthlyCategoryStats } from "@/lib/queries/stats";
import { TopCategories } from "../stats/top-categories";

export async function TopCategoriesSection() {
  const stats = await getMonthlyCategoryStats();
  const dateRange = getCurrentMonthDateRange();

  return <TopCategories stats={stats} dateRange={dateRange} />;
}
