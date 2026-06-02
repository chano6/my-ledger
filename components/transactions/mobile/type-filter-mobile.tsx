import Link from "next/link";
import type { TransactionType } from "@/lib/types";
import { cn, makeTransactionsUrl } from "@/lib/utils";

type TypeFilterMobileProps = {
  currentType?: TransactionType;
  currentCategoryId?: string;
  currentStartDate?: string;
  currentEndDate?: string;
  currentSearch?: string;
};

export function TypeFilterMobile({
  currentType,
  currentCategoryId,
  currentStartDate,
  currentEndDate,
  currentSearch,
}: TypeFilterMobileProps) {
  const buildUrl = (type: TransactionType | undefined) =>
    makeTransactionsUrl({
      type,
      categoryId: currentCategoryId,
      startDate: currentStartDate,
      endDate: currentEndDate,
      search: currentSearch,
    });

  return (
    <div className="inline-flex w-full items-center rounded-lg border border-border bg-bg-sunken p-0.75">
      <FilterButton href={buildUrl(undefined)} active={!currentType}>
        전체
      </FilterButton>
      <FilterButton href={buildUrl("income")} active={currentType === "income"}>
        수입
      </FilterButton>
      <FilterButton href={buildUrl("expense")} active={currentType === "expense"}>
        지출
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
  children: React.ReactNode;
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
