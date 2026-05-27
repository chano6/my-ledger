import Link from "next/link";
import type { Category, TransactionType } from "@/lib/types";
import { cn, makeTransactionsUrl } from "@/lib/utils";

type CategoryFilterProps = {
  categories: Category[];
  categoryId?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  search?: string;
};

const VISIBLE_COUNT = 5;

export function CategoryFilter({
  categories,
  categoryId,
  type,
  startDate,
  endDate,
  search,
}: CategoryFilterProps) {
  const visible = categories.slice(0, VISIBLE_COUNT);
  const hiddenCount = categories.length - VISIBLE_COUNT;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {/* 전체 카테고리 */}
      <CategoryChip
        href={makeTransactionsUrl({ type, categoryId: undefined, startDate, endDate, search })}
        active={!categoryId}
      >
        전체 카테고리
      </CategoryChip>

      {/* 개별 카테고리 */}
      {visible.map((category) => (
        <CategoryChip
          key={category.id}
          href={makeTransactionsUrl({ type, categoryId: category.id, startDate, endDate, search })}
          active={categoryId === category.id}
        >
          <span className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: category.color }} />
          {category.name}
        </CategoryChip>
      ))}

      {/* 더 있으면 +N */}
      {hiddenCount > 0 && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.75 py-1.25 text-[12.5px] font-medium text-fg-muted">
          + {hiddenCount}
        </span>
      )}
    </div>
  );
}

function CategoryChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.75 py-1.25 text-[12.5px] transition-colors",
        active
          ? "border border-transparent bg-peach-soft font-semibold text-peach-deep"
          : "border border-border bg-card font-medium text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}
