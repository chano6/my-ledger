import { Suspense } from "react";
import { CategorySection } from "@/components/dashboard/category-section";
import { MonthlyChartSection } from "@/components/dashboard/monthly-chart-section";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import {
  CategorySectionSkeleton,
  ChartSkeleton,
  SummaryCardsSkeleton,
  TransactionListSkeleton,
} from "@/components/dashboard/skeletons";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { PageHeader } from "@/components/ui/page-header";
import { createClient } from "@/lib/supabase/server";

async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <PageHeader title="대시보드" description={`안녕하세요, ${user?.email}님 👋`} />

      {/* 요약 카드 */}
      <div className="mb-8">
        <Suspense fallback={<SummaryCardsSkeleton />}>
          <SummaryCards />
        </Suspense>
      </div>

      {/* 월별 막대 차트 */}
      <div className="mb-8">
        <Suspense fallback={<ChartSkeleton height="h-87.5" />}>
          <MonthlyChartSection />
        </Suspense>
      </div>

      {/* 카테고리 섹션 */}
      <div className="mb-8">
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>
      </div>

      {/* 최근 거래 */}
      <Suspense fallback={<TransactionListSkeleton />}>
        <RecentTransactions />
      </Suspense>
    </>
  );
}

export default DashboardPage;
