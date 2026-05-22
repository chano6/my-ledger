import { PageHeader } from "@/components/common/page-header";
import { ChartSkeleton, SummaryCardsSkeleton } from "@/components/dashboard/skeletons";

export default function DashboardLoading() {
  return (
    <>
      <PageHeader title="대시보드" />

      <SummaryCardsSkeleton />

      <div className="mb-8">
        <ChartSkeleton height="h-87.5" />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChartSkeleton height="h-82.5" />
        <ChartSkeleton height="h-82.5" />
      </div>
    </>
  );
}
