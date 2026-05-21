import { CategoryPieChart } from "@/components/stats/category-pie-chart";
import { MonthlyBarChart } from "@/components/stats/monthly-bar-chart";
import { TransactionList } from "@/components/transactions/transaction-list";
import { PageHeader } from "@/components/ui/page-header";
import { formatCurrency } from "@/lib/format";
import {
  getCurrentMonthSummary,
  getMonthlyCategoryStats,
  getRecentMonthsStats,
} from "@/lib/queries/stats";
import { getTransactions } from "@/lib/queries/transactions";
import { createClient } from "@/lib/supabase/server";

async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 거래 목록 가져오기
  const [transactions, categoryStats, monthlySummary, monthlyStats] = await Promise.all([
    getTransactions({ limit: 5 }), // 표시용
    getMonthlyCategoryStats(), // 파이 차트용
    getCurrentMonthSummary(), // 통계 카드용
    getRecentMonthsStats(6), // 월별 차트용
  ]);

  const { income, expense, balance } = monthlySummary;

  return (
    <>
      <PageHeader title="대시보드" description={`안녕하세요, ${user?.email}님 👋`} />

      {/* 이번 달 요약 카드 */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">이번 달 수입</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{formatCurrency(income)}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">이번 달 지출</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{formatCurrency(expense)}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">잔액</p>
          <p className="mt-1 text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="mb-8">
        <MonthlyBarChart data={monthlyStats} />
      </div>

      <div className="mb-8">
        <CategoryPieChart stats={categoryStats} />
      </div>

      {/* 거래 목록 */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">최근 거래</h2>
        <TransactionList transactions={transactions} />
      </div>
    </>
  );
}

export default DashboardPage;
