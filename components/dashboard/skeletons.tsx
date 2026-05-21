export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-8 w-32 animate-pulse rounded bg-muted" />
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

export function CategorySectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ChartSkeleton height="h-[330px]" />
      <ChartSkeleton height="h-[330px]" />
    </div>
  );
}

export function TransactionListSkeleton() {
  return (
    <div>
      <div className="mb-4 h-6 w-32 animate-pulse rounded bg-muted" />
      <div className="space-y-2 rounded-lg border p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
