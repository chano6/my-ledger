import type { Category } from "@/lib/types";
import { EmptyState } from "../common/empty-state";
import { CategoryCard } from "./category-card";

type CategoryGroupProps = {
  title: string;
  count: number;
  categories: Category[];
};

export function CategoryGroup({ title, count, categories }: CategoryGroupProps) {
  return (
    <div className="space-y-3">
      {/* 그룹 헤더 */}
      <div className="px-1 text-[11.5px] font-semibold uppercase tracking-wider text-fg-soft">
        {title} · {count}개
      </div>

      {/* 카테고리 목록 */}
      {categories.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <EmptyState message={`${title} 카테고리가 없습니다.`} />
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
