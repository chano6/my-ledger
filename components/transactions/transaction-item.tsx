import Link from "next/link";
import { formatCurrency, formatShortDate } from "@/lib/format";
import type { TransactionWithCategory } from "@/lib/types";
import { Button } from "../ui/button";
import { DeleteButton } from "./delete-button";

export function TransactionItem({ transaction }: { transaction: TransactionWithCategory }) {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center justify-between border-b py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        {/* 카테고리 색상 동그라미 */}
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: transaction.category?.color ?? "#888" }}
        />
        <div>
          <div className="font-medium">
            {transaction.description || transaction.category?.name || "거래"}
          </div>
          <div className="text-sm text-muted-foreground">
            {transaction.category?.name ?? "카테고리 없음"} · {formatShortDate(transaction.date)}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={isIncome ? "text-green-600" : "text-red-600"}>
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href={`/transactions/${transaction.id}/edit`}>수정</Link>
        </Button>

        <DeleteButton id={transaction.id} />
      </div>
    </div>
  );
}
