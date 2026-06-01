import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

type TransactionsStatsCompactProps = {
  income: { total: number; count: number };
  expense: { total: number; count: number };
};

export function TransactionsStatsCompact({ income, expense }: TransactionsStatsCompactProps) {
  const balance = income.total - expense.total;

  return (
    <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <StatItem label="수입" amount={income.total} prefix="+" amountClassName="text-income" />
      <StatItem label="지출" amount={expense.total} prefix="-" amountClassName="text-coral" />
      <StatItem
        label="순액"
        amount={balance}
        prefix={balance >= 0 ? "+" : "-"}
        amountClassName={balance >= 0 ? "text-peach-deep" : "text-coral"}
      />
    </div>
  );
}

function StatItem({
  label,
  amount,
  prefix,
  amountClassName,
}: {
  label: string;
  amount: number;
  prefix: string;
  amountClassName: string;
}) {
  return (
    <div className="px-3 py-3">
      <div className="text-[11px] font-medium text-fg-soft">{label}</div>
      <div className={cn("num mt-0.5 text-[13px] font-bold tracking-tight", amountClassName)}>
        {prefix}
        {formatCurrency(Math.abs(amount))}
      </div>
    </div>
  );
}
