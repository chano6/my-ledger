import { TransactionsStatsCard } from "./card";

type TransactionsStatsProps = {
  income: { total: number; count: number };
  expense: { total: number; count: number };
  filterRangeLabel: string;
};

export function TransactionsStats({ income, expense, filterRangeLabel }: TransactionsStatsProps) {
  const balance = income.total - expense.total;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      <TransactionsStatsCard
        variant="income"
        label="수입 합계"
        amount={income.total}
        sign="+"
        badgeText={`${income.count}건`}
      />

      <TransactionsStatsCard
        variant="expense"
        label="지출 합계"
        amount={expense.total}
        sign="-"
        badgeText={`${expense.count}건`}
      />

      <TransactionsStatsCard
        variant="balance"
        label="순액"
        amount={balance}
        sign={balance >= 0 ? "+" : "-"}
        badgeText={filterRangeLabel}
        amountColorOverride={balance >= 0 ? "text-income" : "text-coral"}
      />
    </div>
  );
}
