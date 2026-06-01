import { Skeleton } from "@/components/ui/skeleton";

// 통계 카드 - 시안 정확히
export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card px-4.5 pt-4.5 pb-4 shadow-sm"
        >
          {/* 라벨 영역 */}
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="h-6.5 w-6.5 rounded-sm" />
            <Skeleton className="h-3.5 w-20" />
          </div>
          {/* 금액 + 차트 */}
          <div className="mb-3 flex items-end justify-between gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-12 w-24" />
          </div>
          {/* 뱃지 */}
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// 월별 차트
export function MonthlyChartSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm lg:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="min-h-70 flex-1 w-full" />
    </div>
  );
}

// 카테고리 도넛
export function CategorySectionSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm lg:p-6">
      <div className="mb-5 space-y-1.5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 lg:flex-row lg:gap-5">
        <Skeleton className="aspect-square w-full max-w-45 rounded-full" />
        <div className="flex w-full flex-col gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 최근 거래
export function RecentTransactionsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm lg:p-6">
      <div className="mb-5 flex items-start justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <Skeleton className="h-9 w-9 rounded-sm" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

// TOP N
export function TopCategoriesSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm lg:p-6">
      <div className="mb-5 space-y-1.5">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-9 w-9 rounded-sm" />
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-1 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 모바일 balance hero 카드
export function BalanceHeroSkeleton() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 space-y-4">
      <Skeleton className="h-3.5 w-20" />
      <Skeleton className="h-9 w-48" />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
