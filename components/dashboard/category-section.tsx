import { CategoryPieChart } from "@/components/stats/category-pie-chart";
import { getCurrentMonthDateRange } from "@/lib/format";
import { getMonthlyCategoryStats } from "@/lib/queries/stats";

export async function CategorySection() {
  const data = await getMonthlyCategoryStats();
  const dateRange = getCurrentMonthDateRange();

  return <CategoryPieChart data={data} dateRange={dateRange} />;
}
