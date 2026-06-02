import Link from "next/link";
import type { ReactNode } from "react";
import type { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";

type TypeFilterMobileProps = {
  totalCount: number;
  expenseCount: number;
  incomeCount: number;
  currentType?: TransactionType;
};

export function TypeFilterMobile({
  totalCount,
  expenseCount,
  incomeCount,
  currentType,
}: TypeFilterMobileProps) {
  return (
    <div className="inline-flex w-full items-center rounded-lg border border-border bg-bg-sunken p-0.75">
      <FilterButton href="/categories" active={!currentType}>
        전체 {totalCount}
      </FilterButton>
      <FilterButton href="/categories?type=expense" active={currentType === "expense"}>
        지출 {expenseCount}
      </FilterButton>
      <FilterButton href="/categories?type=income" active={currentType === "income"}>
        수입 {incomeCount}
      </FilterButton>
    </div>
  );
}

function FilterButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-1 items-center justify-center rounded-md py-2 text-[13px] font-semibold transition-colors",
        active ? "bg-card text-fg shadow-sm" : "text-fg-muted",
      )}
    >
      {children}
    </Link>
  );
}
