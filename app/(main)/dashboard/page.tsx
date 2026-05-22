import { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { CategorySection } from "@/components/dashboard/category-section";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { MonthlyChartSection } from "@/components/dashboard/monthly-chart-section";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import {
  CategorySectionSkeleton,
  MonthlyChartSkeleton,
  RecentTransactionsSkeleton,
  SummaryCardsSkeleton,
} from "@/components/dashboard/skeletons";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { getCurrentProfile } from "@/lib/queries/profile";
import { getCurrentMonthSummary } from "@/lib/queries/stats";
import { createClient } from "@/lib/supabase/server";

async function SummaryCardsData() {
  const { income, expense } = await getCurrentMonthSummary();
  return <SummaryCards income={income} expense={expense} />;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user ? await getCurrentProfile(user.id) : null;
  const userEmail = user?.email ?? "";
  const userName = profile?.name ?? userEmail.split("@")[0] ?? "사용자";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return (
    <>
      <PageHeader
        title="대시보드"
        description={`${year}년 ${month}월 · ${userName}님의 가계부 한눈에 보기`}
        action={<DashboardActions />}
      />

      <div className="space-y-6 px-4 py-6 md:px-8 md:py-8">
        {/* 요약 카드 */}
        <Suspense fallback={<SummaryCardsSkeleton />}>
          <SummaryCardsData />
        </Suspense>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* 월별 막대 차트 */}
            <Suspense fallback={<MonthlyChartSkeleton />}>
              <MonthlyChartSection />
            </Suspense>
          </div>
          <div>
            {/* 카테고리 섹션 */}
            <Suspense fallback={<CategorySectionSkeleton />}>
              <CategorySection />
            </Suspense>
          </div>
        </div>

        {/* 최근 거래 */}
        <Suspense fallback={<RecentTransactionsSkeleton />}>
          <RecentTransactions />
        </Suspense>
      </div>
    </>
  );
}
