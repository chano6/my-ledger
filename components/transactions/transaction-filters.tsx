import Link from "next/link";
import { type ReactNode, Suspense } from "react";
import type { Category, TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "./category-filter";
import { DateFilter } from "./date-filter";

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
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
      {/* 날짜 필터 */}
      <Suspense>
        <DateFilter currentStartDate={currentStartDate} currentEndDate={currentEndDate} />
      </Suspense>

      {/* 유형 세그먼티드 */}
      <TypeSegmented
        currentType={currentType}
        currentCategoryId={currentCategoryId}
        currentStartDate={currentStartDate}
        currentEndDate={currentEndDate}
        currentSearch={currentSearch}
      />

      {/* 카테고리 필터 */}
      <Suspense>
        <CategoryFilter categories={categories} currentCategoryId={currentCategoryId} />
      </Suspense>
    </div>
  );
}

function TypeSegmented({
  currentType,
  currentCategoryId,
  currentStartDate,
  currentEndDate,
  currentSearch,
}: {
  currentType?: TransactionType;
  currentCategoryId?: string;
  currentStartDate?: string;
  currentEndDate?: string;
  currentSearch?: string;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-bg-sunken p-0.5">
      <SegmentLink
        href={makeUrl(
          undefined,
          currentCategoryId,
          currentStartDate,
          currentEndDate,
          currentSearch,
        )}
        active={!currentType}
      >
        전체
      </SegmentLink>
      <SegmentLink
        href={makeUrl("income", currentCategoryId, currentStartDate, currentEndDate, currentSearch)}
        active={currentType === "income"}
      >
        수입
      </SegmentLink>
      <SegmentLink
        href={makeUrl(
          "expense",
          currentCategoryId,
          currentStartDate,
          currentEndDate,
          currentSearch,
        )}
        active={currentType === "expense"}
      >
        지출
      </SegmentLink>
    </div>
  );
}

function makeUrl(
  type: TransactionType | undefined,
  categoryId?: string,
  startDate?: string,
  endDate?: string,
  search?: string,
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
  if (search) {
    params.set("search", search);
  }

  const queryString = params.toString();
  return `/transactions${queryString ? `?${queryString}` : ""}`;
}

function SegmentLink({
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
        "rounded-[6px] px-3 py-1 text-[13px] font-medium transition-colors",
        active ? "bg-card text-fg shadow-sm" : "text-fg-soft hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}
