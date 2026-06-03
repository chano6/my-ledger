import { Pencil } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { CategoryIcon } from "../common/category-icon";
import { CategoryTypeBadge } from "./category-type-badge";
import { DeleteCategoryButton } from "./delete-category-button";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const isIncome = category.type === "income";

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3.5 shadow-sm transition-colors hover:border-border-strong">
      {/* 카테고리 아이콘 */}
      <CategoryIcon icon={category.icon} color={category.color} size="lg" />

      {/* 정보 */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-fg">{category.name}</span>
          <CategoryTypeBadge isIncome={isIncome} color={`${category.color}99`} />
        </div>
      </div>

      {/* 액션 (수정 + 삭제) */}
      <div className="flex items-center gap-1">
        <Link
          href={`/categories/${category.id}/edit`}
          className="flex h-8 w-8 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-bg-sunken hover:text-fg"
          aria-label="수정"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Link>
        <DeleteCategoryButton id={category.id} name={category.name} />
      </div>
    </div>
  );
}
