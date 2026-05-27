import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { calcChangeRate, cn } from "@/lib/utils";
import { MiniLineChart } from "./mini-line-chart";

type MonthlyData = {
  income: number;
  expense: number;
};

type SummaryCardsProps = {
  current: MonthlyData;
  previous: MonthlyData;
  trend: MonthlyData[];
};

export function SummaryCards({ current, previous, trend }: SummaryCardsProps) {
  const currentBalance = current.income - current.expense;
  const previousBalance = previous.income - previous.expense;

  // 증감률 계산
  const incomeChange = calcChangeRate(current.income, previous.income);
  const expenseChange = calcChangeRate(current.expense, previous.expense);
  const balanceChange = calcChangeRate(currentBalance, previousBalance);

  // 추이 데이터
  const incomeTrend = trend.map((m) => m.income);
  const expenseTrend = trend.map((m) => m.expense);
  const balanceTrend = trend.map((m) => m.income - m.expense);

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
        trendData={incomeTrend}
        trendColor="oklch(0.55 0.08 155)"
        chartId="income"
      />
      <SummaryCard
        label="이번 달 지출"
        amount={current.expense}
        icon={TrendingDown}
        iconBg="bg-coral-soft"
        iconColor="text-coral"
        change={expenseChange}
        changeType="expense"
        trendData={expenseTrend}
        trendColor="oklch(0.7 0.13 25)"
        chartId="expense"
      />
      <SummaryCard
        label="잔액"
        amount={currentBalance}
        icon={Wallet}
        iconBg="bg-peach-soft"
        iconColor="text-peach-deep"
        change={balanceChange}
        changeType="balance"
        trendData={balanceTrend}
        trendColor="oklch(0.55 0.11 75)"
        chartId="balance"
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
  trendData: number[];
  trendColor: string;
  chartId: string;
};

function SummaryCard({
  label,
  amount,
  icon: Icon,
  iconBg,
  iconColor,
  change,
  changeType,
  trendData,
  trendColor,
  chartId,
}: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card px-4.5 pt-4.5 pb-4">
      <div className="mb-3 flex items-center gap-2">
        <div className={cn("flex h-6.5 w-6.5 items-center justify-center rounded-sm", iconBg)}>
          <Icon className={cn("h-3.5 w-3.5", iconColor)} />
        </div>
        <span className="text-[12.5px] font-medium text-fg-muted">{label}</span>
      </div>
      <div className="mb-3 flex items-end justify-between gap-2">
        <div className="num text-[28px] font-bold tracking-tight">{formatCurrency(amount)}</div>
        <div className="shrink-0">
          <MiniLineChart data={trendData} color={trendColor} chartId={chartId} />
        </div>
      </div>
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
      <div className="inline-flex items-center rounded-full bg-bg-sunken px-2 py-0.5 text-[12px] font-semibold text-fg-muted">
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
        "inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-semibold",
        isGoodChange ? "bg-sage-soft text-sage-deep" : "bg-coral-soft text-coral",
      )}
    >
      {sign}
      {change.toFixed(1)}% 전월 대비
    </div>
  );
}
