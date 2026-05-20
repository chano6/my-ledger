import Link from "next/link";
import type { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";

type TransactionFiltersProps = {
  currentType?: TransactionType;
};

export function TransactionFilters({ currentType }: TransactionFiltersProps) {
  return (
    <div className="flex gap-2">
      <FilterLink href="/transactions" active={!currentType}>
        전체
      </FilterLink>
      <FilterLink href="/transactions?type=income" active={currentType === "income"}>
        수입
      </FilterLink>
      <FilterLink href="/transactions?type=expense" active={currentType === "expense"}>
        지출
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
