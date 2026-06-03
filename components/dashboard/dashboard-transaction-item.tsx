import { formatCurrency, formatRelativeDate } from "@/lib/format";
import type { TransactionWithCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "../common/category-icon";

type DashboardTransactionItemProps = {
  transaction: TransactionWithCategory;
};

export function DashboardTransactionItem({ transaction }: DashboardTransactionItemProps) {
  const isIncome = transaction.type === "income";
  const categoryName = transaction.category?.name ?? "카테고리 없음";
  const categoryIcon = transaction.category?.icon ?? "tag";
  const categoryColor = transaction.category?.color ?? "#888888";
  const displayName = transaction.description || categoryName;

  return (
    <div className="flex items-center gap-3 py-3">
      {/* 카테고리 아이콘 */}
      <CategoryIcon icon={categoryIcon} color={categoryColor} size="md" />

      {/* 거래명 + 카테고리·날짜 */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-medium text-fg">{displayName}</div>
        <div className="text-[12px] text-fg-soft">
          {categoryName} · {formatRelativeDate(transaction.date)}
        </div>
      </div>

      {/* 금액 */}
      <div
        className={cn(
          "num shrink-0 text-[14px] font-semibold",
          isIncome ? "text-income" : "text-fg",
        )}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
}
