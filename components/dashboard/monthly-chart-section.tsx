import { getRecentMonthsStats } from "@/lib/queries/stats";
import { MonthlyBarChart } from "../stats/monthly-bar-chart";

export async function MonthlyChartSection() {
  const stats = await getRecentMonthsStats(6);
  return <MonthlyBarChart data={stats} />;
}
