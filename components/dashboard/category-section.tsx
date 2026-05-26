import { CategoryPieChart } from "@/components/stats/category-pie-chart";
import { getMonthlyCategoryStats } from "@/lib/queries/stats";

export async function CategorySection() {
  const data = await getMonthlyCategoryStats();

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateRange = `${month}월 1일 ~ ${month}월 ${day}일`;

  return <CategoryPieChart data={data} dateRange={dateRange} />;
}
