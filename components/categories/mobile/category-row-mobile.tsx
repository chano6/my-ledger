import { CategoryIcon } from "@/components/common/category-icon";
import type { Category } from "@/lib/types";
import { CategoryRowActions } from "./category-row-actions";

type CategoryRowMobileProps = {
  category: Category;
};

export function CategoryRowMobile({ category }: CategoryRowMobileProps) {
  const isIncome = category.type === "income";

  return (
    <div className="flex items-center gap-3 py-3">
      {/* 아이콘 */}
      <CategoryIcon icon={category.icon} color={category.color} size="md" />

      {/* 정보 */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-fg">{category.name}</div>
        <div className="mt-0.5 text-[11px] text-fg-soft">{isIncome ? "수입" : "지출"}</div>
      </div>

      <CategoryRowActions category={category} />
    </div>
  );
}
