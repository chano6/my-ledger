import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTransactions } from "@/lib/queries/transactions";
import { CardHeader } from "../common/card-header";
import { DashboardTransactionItem } from "./dashboard-transaction-item";

export async function RecentTransactions() {
  const transactions = await getTransactions({ limit: 7 });

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm md:p-6">
      <CardHeader
        title="최근 거래"
        description="최근 7일 내 거래 내역"
        action={
          <Link
            href="/transactions"
            className="flex items-center gap-1 text-[12px] font-medium text-fg-soft transition-colors hover:text-fg"
          >
            전체 보기
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {transactions.length === 0 ? (
        <div className="py-12 text-center text-sm text-fg-soft">아직 거래 내역이 없습니다.</div>
      ) : (
        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <DashboardTransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}
