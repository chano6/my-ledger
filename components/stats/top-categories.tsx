import { formatCurrency } from "@/lib/format";
import type { CategoryStats } from "@/lib/types";
import { CardHeader } from "../common/card-header";
import { CategoryIcon } from "../common/category-icon";

type TopCategoriesProps = {
  stats: CategoryStats[];
  limit?: number;
  dateRange: string;
};

export function TopCategories({ stats, limit = 5, dateRange }: TopCategoriesProps) {
  const top = stats.slice(0, limit);

  if (top.length === 0) {
    return (
      <div className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm lg:h-full lg:p-6">
        <CardHeader
          title="가장 많이 쓴 카테고리"
          description={`${dateRange} · 지출 기준 상위 ${limit}`}
        />
        <div className="flex flex-1 items-center justify-center text-sm text-fg-soft">
          이번 달 지출 내역이 없습니다.
        </div>
      </div>
    );
  }

  const total = stats.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm lg:h-full lg:p-6">
      <CardHeader
        title="가장 많이 쓴 카테고리"
        description={`${dateRange} · 지출 기준 상위 ${limit}`}
      />

      <div className="flex flex-1 flex-col gap-4 py-3">
        {top.map((item, index) => {
          const percentage = total > 0 ? (item.total / total) * 100 : 0;

          return (
            <div key={item.category_id} className="flex items-center gap-3">
              {/* 순위 번호 */}
              <span className="num w-4 text-center text-[13px] font-semibold text-fg-soft">
                {index + 1}
              </span>

              {/* 카테고리 아이콘 */}
              <CategoryIcon name={item.category_name} color={item.category_color} size="md" />

              {/* 정보 + 진행바 */}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-semibold text-fg">
                      {item.category_name}
                    </div>
                    <div className="text-[11px] text-fg-soft">{item.count}건</div>
                  </div>
                  <div className="num shrink-0 text-[14px] font-semibold">
                    {formatCurrency(item.total)}
                  </div>
                </div>

                {/* 진행바 */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-bg-sunken">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: `${item.category_color}99`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
