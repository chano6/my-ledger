import { EmptyState } from "@/components/common/empty-state";
import type { Category } from "@/lib/types";
import { CategoryRowMobile } from "./category-row-mobile";

type CategoryGroupMobileProps = {
  title: string;
  count: number;
  categories: Category[];
};

export function CategoryGroupMobile({ title, count, categories }: CategoryGroupMobileProps) {
  return (
    <div className="space-y-2">
      {/* 그룹 헤더 */}
      <div className="px-1 text-[11.5px] font-semibold text-fg-muted">
        {title} · {count}개
      </div>

      {/* 카테고리 목록 */}
      {categories.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <EmptyState message={`${title} 카테고리가 없습니다.`} />
        </div>
      ) : (
        <div className="divide-y divide-border rounded-xl border border-border bg-card px-4 shadow-sm">
          {categories.map((category) => (
            <CategoryRowMobile key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
