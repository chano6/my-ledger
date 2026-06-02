"use client";

import { MoreHorizontal } from "lucide-react";
import { CategoryIcon } from "@/components/common/category-icon";
import type { Category } from "@/lib/types";

type CategoryRowMobileProps = {
  category: Category;
};

export function CategoryRowMobile({ category }: CategoryRowMobileProps) {
  const isIncome = category.type === "income";

  return (
    <div className="flex items-center gap-3 py-3">
      {/* 아이콘 */}
      <CategoryIcon name={category.name} color={category.color} size="md" />

      {/* 정보 */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-fg">{category.name}</div>
        <div className="mt-0.5 text-[11px] text-fg-soft">{isIncome ? "수입" : "지출"}</div>
      </div>

      {/* ⋯ 메뉴 */}
      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-bg-sunken hover:text-fg"
        aria-label="메뉴"
        onClick={() => {
          // TODO: BottomSheet 또는 메뉴 열기
          alert(`카테고리: ${category.name}`);
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
