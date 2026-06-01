import { CardHeader } from "@/components/common/card-header";
import { EmptyState } from "@/components/common/empty-state";
import { groupTransactionsByDate } from "@/lib/format";
import type { TransactionWithCategory } from "@/lib/types";
import { TransactionRow } from "./row";

type TransactionListProps = {
  transactions: TransactionWithCategory[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <EmptyState message="아직 거래 내역이 없습니다." />
      </div>
    );
  }

  const groups = groupTransactionsByDate(transactions);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      {/* 카드 헤더 */}
      <div className="border-b border-border px-5 py-4 lg:px-6">
        <CardHeader title="거래 목록" description={`날짜순 · ${transactions.length}건 표시 중`} />
      </div>

      {/* 테이블 헤더 (데스크탑) */}
      <div className="hidden border-b border-border bg-peach-soft/30 lg:grid lg:grid-cols-[1fr_160px_0.75fr_140px_40px] lg:items-center lg:gap-3 lg:px-6 lg:py-3">
        <div className="text-[11.5px] font-semibold uppercase tracking-wider text-fg-muted">
          거래
        </div>
        <div className="text-[11.5px] font-semibold uppercase tracking-wider text-fg-muted">
          카테고리
        </div>
        <div className="text-[11.5px] font-semibold uppercase tracking-wider text-fg-muted">
          메모
        </div>
        <div className="text-right text-[11.5px] font-semibold uppercase tracking-wider text-fg-muted">
          금액
        </div>
        <div />
      </div>

      {/* 거래 행들 */}
      <div>
        {groups.map((group) => (
          <div key={group.date}>
            {/* 날짜 그룹 헤더 */}
            <div className="border-b border-border bg-peach-soft/30 px-5 py-2 text-[12px] font-semibold text-fg-muted lg:px-6">
              {group.label}
            </div>

            {/* 그룹 내 거래들 */}
            {group.transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
