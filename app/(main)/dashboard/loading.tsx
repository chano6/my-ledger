import { PageHeader } from "@/components/common/page-header";
import {
  CategorySectionSkeleton,
  MonthlyChartSkeleton,
  RecentTransactionsSkeleton,
  SummaryCardsSkeleton,
  TopCategoriesSkeleton,
} from "@/components/dashboard/skeletons";

export default function DashboardLoading() {
  return (
    <>
      <PageHeader title="대시보드" />

      <div className="space-y-6 px-4 py-6 md:px-8 md:py-8">
        <SummaryCardsSkeleton />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          <div className="md:col-span-2">
            <MonthlyChartSkeleton />
          </div>
          <div>
            <CategorySectionSkeleton />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <RecentTransactionsSkeleton />
          </div>
          <div>
            <TopCategoriesSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
