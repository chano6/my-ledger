import Link from "next/link";
import type { ReactNode } from "react";
import type { TransactionType } from "@/lib/types";
import { cn, makeTransactionsUrl } from "@/lib/utils";

type TypeFilterProps = {
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
};

export function TypeFilter({ type, categoryId, startDate, endDate, search }: TypeFilterProps) {
  return (
    <div className="inline-flex items-center rounded-[9px] border border-border bg-bg-sunken p-0.75">
      <SegmentLink
        href={makeTransactionsUrl({
          type: undefined,
          categoryId,
          startDate,
          endDate,
          search,
        })}
        active={!type}
      >
        전체
      </SegmentLink>
      <SegmentLink
        href={makeTransactionsUrl({ type: "income", categoryId, startDate, endDate, search })}
        active={type === "income"}
      >
        수입
      </SegmentLink>
      <SegmentLink
        href={makeTransactionsUrl({
          type: "expense",
          categoryId,
          startDate,
          endDate,
          search,
        })}
        active={type === "expense"}
      >
        지출
      </SegmentLink>
    </div>
  );
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
        "rounded-[6px] px-3.5 py-1.25 text-[12.5px] font-semibold transition-colors",
        active ? "bg-card text-fg shadow-sm" : "text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}
