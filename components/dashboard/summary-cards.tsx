import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { calcChangeRate, cn } from "@/lib/utils";

type SummaryCardsProps = {
  current: { income: number; expense: number };
  previous: { income: number; expense: number };
};

export function SummaryCards({ current, previous }: SummaryCardsProps) {
  const currentBalance = current.income - current.expense;
  const previousBalance = previous.income - previous.expense;

  // 증감률 계산
  const incomeChange = calcChangeRate(current.income, previous.income);
  const expenseChange = calcChangeRate(current.expense, previous.expense);
  const balanceChange = calcChangeRate(currentBalance, previousBalance);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      <SummaryCard
        label="이번 달 수입"
        amount={current.income}
        icon={TrendingUp}
        iconBg="bg-sage-soft"
        iconColor="text-sage-deep"
        change={incomeChange}
        changeType="income"
      />
      <SummaryCard
        label="이번 달 지출"
        amount={current.expense}
        icon={TrendingDown}
        iconBg="bg-coral-soft"
        iconColor="text-coral"
        change={expenseChange}
        changeType="expense"
      />
      <SummaryCard
        label="잔액"
        amount={currentBalance}
        icon={Wallet}
        iconBg="bg-peach-soft"
        iconColor="text-peach-deep"
        change={balanceChange}
        changeType="balance"
      />
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  amount: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  change: number | null;
  changeType: "income" | "expense" | "balance";
};

function SummaryCard({
  label,
  amount,
  icon: Icon,
  iconBg,
  iconColor,
  change,
  changeType,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-md", iconBg)}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
        <span className="text-[13px] text-fg-soft">{label}</span>
      </div>
      <div className="num mb-3 text-[26px] font-bold tracking-tight">{formatCurrency(amount)}</div>
      <ChangeBadge change={change} changeType={changeType} />
    </div>
  );
}

type ChangeBadgeProps = {
  change: number | null;
  changeType: "income" | "expense" | "balance";
};

function ChangeBadge({ change, changeType }: ChangeBadgeProps) {
  if (change === null) {
    return (
      <div className="inline-flex items-center rounded-full bg-bg-sunken px-2.5 py-0.5 text-[11px] font-semibold text-fg-soft">
        전월 데이터 없음
      </div>
    );
  }

  // 좋은 변화인지 판단
  const isPositive = change > 0;
  const isGoodChange =
    changeType === "income"
      ? isPositive // 수입 증가는 좋음
      : changeType === "expense"
        ? !isPositive // 지출 감소는 좋음
        : isPositive; // 잔액 증가는 좋음

  const sign = isPositive ? "+" : "";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        isGoodChange ? "bg-sage-soft text-sage-deep" : "bg-coral-soft text-coral",
      )}
    >
      {sign}
      {change.toFixed(1)}% 전월 대비
    </div>
  );
}
