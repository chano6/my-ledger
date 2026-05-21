import { CategoryPieChart } from "@/components/stats/category-pie-chart";
import { TopCategories } from "@/components/stats/top-categories";
import { getMonthlyCategoryStats } from "@/lib/queries/stats";

export async function CategorySection() {
  const stats = await getMonthlyCategoryStats();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <CategoryPieChart stats={stats} />
      <TopCategories stats={stats} limit={5} />
    </div>
  );
}
