import { formatCurrency } from "@/lib/format";
import type { CategoryStats } from "@/lib/types";

type TopCategoriesProps = {
  stats: CategoryStats[];
  limit?: number;
};

export function TopCategories({ stats, limit = 5 }: TopCategoriesProps) {
  const top = stats.slice(0, limit);

  const total = stats.reduce((sum, item) => sum + item.total, 0);

  if (top.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">가장 많이 쓴 카테고리</h3>
        <div className="py-8 text-center text-muted-foreground">이번 달 지출 내역이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">가장 많이 쓴 카테고리</h3>

      <div className="space-y-4">
        {top.map((item, index) => {
          const percentage = total > 0 ? (item.total / total) * 100 : 0;

          return (
            <div key={item.category_id}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">{index + 1}.</span>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.category_color }}
                  />
                  <span className="font-medium">{item.category_name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{formatCurrency(item.total)}</span>
                  <span className="ml-2 text-muted-foreground">{percentage.toFixed(1)}%</span>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.category_color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
