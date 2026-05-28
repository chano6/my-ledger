import Link from "next/link";
import type { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryTypeFilterProps = {
  totalCount: number;
  expenseCount: number;
  incomeCount: number;
  currentType?: TransactionType;
};

export function CategoryTypeFilter({
  totalCount,
  expenseCount,
  incomeCount,
  currentType,
}: CategoryTypeFilterProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-bg-sunken p-0.75">
      <FilterLink href="/categories" active={!currentType}>
        전체 ({totalCount})
      </FilterLink>
      <FilterLink href="/categories?type=expense" active={currentType === "expense"}>
        지출 ({expenseCount})
      </FilterLink>
      <FilterLink href="/categories?type=income" active={currentType === "income"}>
        수입 ({incomeCount})
      </FilterLink>
    </div>
  );
}

function FilterLink({
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
        "flex h-9 items-center rounded-md px-3.5 text-[12.5px] font-semibold transition-colors",
        active ? "bg-card text-fg shadow-sm" : "text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}
