import { CategoryIcon } from "@/components/common/category-icon";
import { formatCurrency } from "@/lib/format";
import type { TransactionWithCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TransactionRowActions } from "./row-actions";

type TransactionRowProps = {
  transaction: TransactionWithCategory;
};

export function TransactionRow({ transaction }: TransactionRowProps) {
  const isIncome = transaction.type === "income";
  const categoryName = transaction.category?.name ?? "카테고리 없음";
  const categoryColor = transaction.category?.color ?? "#888888";
  const displayName = transaction.description || categoryName;

  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border px-5 py-4 transition-colors hover:bg-bg-sunken/30 md:grid-cols-[1fr_160px_0.75fr_140px_40px] md:gap-5 md:px-6 md:py-4">
      {/* 1. 거래명 (아이콘 + 이름) */}
      <div className="flex min-w-0 items-center gap-3">
        <CategoryIcon name={categoryName} color={categoryColor} size="md" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold text-fg">{displayName}</div>
        </div>
      </div>

      {/* 2. 카테고리 칩 (데스크탑만) */}
      <div className="hidden md:block">
        <CategoryChip name={categoryName} color={categoryColor} isIncome={isIncome} />
      </div>

      {/* 3. 메모 (데스크탑만) */}
      <div className="hidden truncate text-[13.5px] text-fg-muted md:block">
        {transaction.description ? transaction.description : "—"}
      </div>

      {/* 4. 금액 + 더보기 */}
      <div className="flex items-center gap-1 justify-self-end md:justify-self-stretch">
        <div
          className={cn(
            "num text-right text-[15px] font-bold whitespace-nowrap",
            isIncome ? "text-income" : "text-fg",
            "md:flex-1",
          )}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </div>
      </div>
      <TransactionRowActions transactionId={transaction.id} />
    </div>
  );
}

// 카테고리 칩 (작은 라운드)
function CategoryChip({
  name,
  color,
  isIncome,
}: {
  name: string;
  color: string;
  isIncome: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold",
        isIncome ? "bg-sage-soft text-sage-deep" : "bg-bg-sunken text-fg-muted",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-[2px]" style={{ backgroundColor: `${color}99` }} />
      {name}
    </span>
  );
}
