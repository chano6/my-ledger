import { CategoryIcon } from "@/components/common/category-icon";
import { formatCurrency, formatRelativeDate } from "@/lib/format";
import type { TransactionWithCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TransactionRowActions } from "../transaction-list/row-actions";

type TransactionCardRowProps = {
  transaction: TransactionWithCategory;
};

export function TransactionCardRow({ transaction }: TransactionCardRowProps) {
  const isIncome = transaction.type === "income";
  const categoryName = transaction.category?.name ?? "카테고리 없음";
  const categoryIcon = transaction.category?.icon ?? "tag";
  const categoryColor = transaction.category?.color ?? "#888888";
  const displayName = transaction.description || categoryName;

  return (
    <div className="flex items-center gap-3 py-3.5">
      <CategoryIcon icon={categoryIcon} color={categoryColor} size="md" />

      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-fg">{displayName}</div>
        <div className="mt-0.5 text-[11.5px] text-fg-soft">
          {categoryName} · {formatRelativeDate(transaction.date)}
        </div>
      </div>

      <div
        className={cn(
          "num shrink-0 text-[14px] font-bold whitespace-nowrap",
          isIncome ? "text-income" : "text-fg",
        )}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </div>

      <TransactionRowActions transactionId={transaction.id} />
    </div>
  );
}
