import { EmptyState } from "@/components/common/empty-state";
import { groupTransactionsByDate } from "@/lib/format";
import type { Category, TransactionWithCategory } from "@/lib/types";
import { TransactionCardRow } from "./transaction-card-row";

type TransactionsListMobileProps = {
  transactions: TransactionWithCategory[];
  categories: Category[];
};

export function TransactionsListMobile({ transactions, categories }: TransactionsListMobileProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <EmptyState message="아직 거래 내역이 없습니다." />
      </div>
    );
  }

  const groups = groupTransactionsByDate(transactions);

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.date} className="space-y-2">
          {/* 날짜 라벨 */}
          <div className="px-1 text-[11.5px] font-semibold text-fg-muted">{group.label}</div>

          {/* 거래 카드 */}
          <div className="divide-y divide-border rounded-xl border border-border bg-card px-4 shadow-sm">
            {group.transactions.map((transaction) => (
              <TransactionCardRow
                key={transaction.id}
                transaction={transaction}
                categories={categories}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
