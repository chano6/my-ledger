import type { TransactionWithCategory } from "@/lib/types";
import { TransactionItem } from "./transaction-item";

export function TransactionList({ transactions }: { transactions: TransactionWithCategory[] }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border p-12 text-center">
        <p className="text-muted-foreground">아직 거래 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="px-4">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
