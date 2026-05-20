import type { TransactionWithCategory } from "@/lib/types";
import { EmptyState } from "../ui/empty-state";
import { TransactionItem } from "./transaction-item";

export function TransactionList({ transactions }: { transactions: TransactionWithCategory[] }) {
  if (transactions.length === 0) {
    return <EmptyState message="아직 거래 내역이 없습니다." />;
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
