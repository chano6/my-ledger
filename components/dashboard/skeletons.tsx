import { Skeleton } from "../ui/skeleton";

// 통계 카드 스켈레톤
export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mb-3 h-9 w-32" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// 월별 막대 차트 스켈레톤
export function MonthlyChartSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 space-y-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-70 w-full" />
    </div>
  );
}

export function ChartSkeleton({ height = "h-[350px]" }: { height?: string }) {
  return (
    <div className={`rounded-lg border p-6 ${height}`}>
      <div className="h-6 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-[calc(100%-2rem)] animate-pulse rounded bg-muted/50" />
    </div>
  );
}

// 카테고리 도넛 차트 + TOP5 스켈레톤
export function CategorySectionSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 space-y-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      {/* 도넛 차트 영역 */}
      <div className="mb-6 flex justify-center">
        <Skeleton className="h-45 w-45 rounded-full" />
      </div>
      {/* TOP5 리스트 */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-1.5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 최근 거래 스켈레톤
export function RecentTransactionsSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <Skeleton className="h-9 w-9 rounded-lg" />
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
