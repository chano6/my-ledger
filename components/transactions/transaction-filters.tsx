import type { Category, TransactionType } from "@/lib/types";
import { CategoryFilter } from "./category-filter";
import { DateFilter } from "./date-filter";
import { TypeFilter } from "./type-filter";

type TransactionFiltersProps = {
  currentType?: TransactionType;
  currentCategoryId?: string;
  currentStartDate?: string;
  currentEndDate?: string;
  currentSearch?: string;
  categories: Category[];
};

export function TransactionFilters({
  currentType,
  currentCategoryId,
  currentStartDate,
  currentEndDate,
  currentSearch,
  categories,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3.5 rounded-lg border border-border bg-card px-4.5 py-3.5 shadow-sm">
      <div className="flex items-center gap-2">
        {/* 날짜 필터 */}
        <DateFilter currentStartDate={currentStartDate} currentEndDate={currentEndDate} />

        {/* 유형 세그먼티드 */}
        <TypeFilter
          type={currentType}
          categoryId={currentCategoryId}
          startDate={currentStartDate}
          endDate={currentEndDate}
          search={currentSearch}
        />
      </div>

      <div className="h-5.5 w-px bg-border" />

      {/* 카테고리 필터 */}
      <CategoryFilter
        categories={categories}
        categoryId={currentCategoryId}
        type={currentType}
        startDate={currentStartDate}
        endDate={currentEndDate}
        search={currentSearch}
      />
    </div>
  );
}
