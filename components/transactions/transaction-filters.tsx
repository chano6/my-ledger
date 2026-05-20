import Link from "next/link";
import { Suspense } from "react";
import type { Category, TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "./category-filter";

type TransactionFiltersProps = {
  currentType?: TransactionType;
  currentCategoryId?: string;
  categories: Category[];
};

export function TransactionFilters({
  currentType,
  currentCategoryId,
  categories,
}: TransactionFiltersProps) {
  return (
    <div className="flex gap-2">
      <FilterLink href={makeUrl("type", undefined, currentCategoryId)} active={!currentType}>
        전체
      </FilterLink>
      <FilterLink
        href={makeUrl("type", "income", currentCategoryId)}
        active={currentType === "income"}
      >
        수입
      </FilterLink>
      <FilterLink
        href={makeUrl("type", "expense", currentCategoryId)}
        active={currentType === "expense"}
      >
        지출
      </FilterLink>

      <Suspense>
        <CategoryFilter categories={categories} currentCategoryId={currentCategoryId} />
      </Suspense>
    </div>
  );
}

function makeUrl(filterKey: "type", filterValue: string | undefined, categoryId?: string): string {
  const params = new URLSearchParams();

  if (filterValue) {
    params.set(filterKey, filterValue);
  }
  if (categoryId) {
    params.set("category", categoryId);
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
