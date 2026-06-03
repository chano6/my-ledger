import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { CategorySection } from "@/components/dashboard/category-section";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { BalanceHero } from "@/components/dashboard/mobile/balance-hero";
import { MonthlyChartSection } from "@/components/dashboard/monthly-chart-section";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import {
  BalanceHeroSkeleton,
  CategorySectionSkeleton,
  MonthlyChartSkeleton,
  RecentTransactionsSkeleton,
  SummaryCardsSkeleton,
  TopCategoriesSkeleton,
} from "@/components/dashboard/skeletons";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { TopCategoriesSection } from "@/components/dashboard/top-categories-section";
import { MobileAppBar } from "@/components/layout/mobile/app-bar";
import { getCategories } from "@/lib/queries/categories";
import { getCurrentProfile } from "@/lib/queries/profile";
import { getMonthlyComparison, getMonthlySummaries } from "@/lib/queries/stats";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "대시보드",
  description: "이번 달 수입과 지출, 카테고리별 통계를 한눈에 확인하세요.",
};

type ComparisonPromise = ReturnType<typeof getMonthlyComparison>;

async function BalanceHeroData({ comparisonPromise }: { comparisonPromise: ComparisonPromise }) {
  const comparison = await comparisonPromise;

  return <BalanceHero income={comparison.current.income} expense={comparison.current.expense} />;
}

async function SummaryCardsData({ comparisonPromise }: { comparisonPromise: ComparisonPromise }) {
  const [comparison, trend] = await Promise.all([comparisonPromise, getMonthlySummaries(6)]);

  return <SummaryCards current={comparison.current} previous={comparison.previous} trend={trend} />;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const comparisonPromise = getMonthlyComparison();
  const categories = await getCategories();

  const profile = await getCurrentProfile();
  const userEmail = user?.email ?? "";
  const userName = profile?.name ?? userEmail.split("@")[0] ?? "사용자";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return (
    <>
      {/* 모바일 앱바 */}
      <MobileAppBar
        title="대시보드"
        subTitle={`${year}년 ${month}월 · ${userName}`}
        userName={userName}
        userEmail={userEmail}
      />

      {/* 데스크탑 페이지 헤더 */}
      <PageHeader
        title="대시보드"
        description={`${year}년 ${month}월 · ${userName}님의 가계부 한눈에 보기`}
        action={<DashboardActions categories={categories} />}
      />

      {/* 모바일 */}
      <div className="space-y-3.5 px-4 py-4 lg:hidden">
        <Suspense fallback={<BalanceHeroSkeleton />}>
          <BalanceHeroData comparisonPromise={comparisonPromise} />
        </Suspense>

        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>

        <Suspense fallback={<TopCategoriesSkeleton />}>
          <TopCategoriesSection />
        </Suspense>

        <Suspense fallback={<RecentTransactionsSkeleton />}>
          <RecentTransactions />
        </Suspense>
      </div>

      {/* 데스크탑 */}
      <div className="hidden space-y-6 px-4 py-6 lg:block lg:px-8 lg:py-8">
        {/* 요약 카드 */}
        <Suspense fallback={<SummaryCardsSkeleton />}>
          <SummaryCardsData comparisonPromise={comparisonPromise} />
        </Suspense>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-5">
          <div className="lg:col-span-3">
            {/* 월별 막대 차트 */}
            <Suspense fallback={<MonthlyChartSkeleton />}>
              <MonthlyChartSection />
            </Suspense>
          </div>
          <div className="lg:col-span-2">
            {/* 카테고리 섹션 */}
            <Suspense fallback={<CategorySectionSkeleton />}>
              <CategorySection />
            </Suspense>
          </div>
        </div>

        {/* 최근 거래 */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Suspense fallback={<RecentTransactionsSkeleton />}>
              <RecentTransactions />
            </Suspense>
          </div>
          <div className="lg:col-span-2">
            <Suspense fallback={<TopCategoriesSkeleton />}>
              <TopCategoriesSection />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
