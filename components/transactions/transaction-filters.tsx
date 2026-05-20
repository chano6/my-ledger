import Link from "next/link";
import { Suspense } from "react";
import type { Category, TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "./category-filter";
import { DateFilter } from "./date-filter";

type TransactionFiltersProps = {
  currentType?: TransactionType;
  currentCategoryId?: string;
  currentStartDate?: string;
  currentEndDate?: string;
  categories: Category[];
};

export function TransactionFilters({
  currentType,
  currentCategoryId,
  currentStartDate,
  currentEndDate,
  categories,
}: TransactionFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <FilterLink
          href={makeUrl(undefined, currentCategoryId, currentStartDate, currentEndDate)}
          active={!currentType}
        >
          전체
        </FilterLink>
        <FilterLink
          href={makeUrl("income", currentCategoryId, currentStartDate, currentEndDate)}
          active={currentType === "income"}
        >
          수입
        </FilterLink>
        <FilterLink
          href={makeUrl("expense", currentCategoryId, currentStartDate, currentEndDate)}
          active={currentType === "expense"}
        >
          지출
        </FilterLink>

        <Suspense>
          <CategoryFilter categories={categories} currentCategoryId={currentCategoryId} />
        </Suspense>
      </div>

      <Suspense>
        <DateFilter currentStartDate={currentStartDate} currentEndDate={currentEndDate} />
      </Suspense>
    </div>
  );
}

function makeUrl(
  type: TransactionType | undefined,
  categoryId?: string,
  startDate?: string,
  endDate?: string,
): string {
  const params = new URLSearchParams();

  if (type) {
    params.set("type", type);
  }
  if (categoryId) {
    params.set("category", categoryId);
  }
  if (startDate) {
    params.set("start", startDate);
  }
  if (endDate) {
    params.set("end", endDate);
  }

  const queryString = params.toString();
  return `/transactions${queryString ? `?${queryString}` : ""}`;
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
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
