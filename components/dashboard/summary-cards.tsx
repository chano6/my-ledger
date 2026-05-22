import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import type { ComponentType } from "react";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

type SummaryCardsProps = {
  income: number;
  expense: number;
};

export async function SummaryCards({ income, expense }: SummaryCardsProps) {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      <SummaryCard
        label="이번 달 수입"
        amount={income}
        icon={TrendingUp}
        iconBg="bg-sage-soft"
        iconColor="text-sage-deep"
        valueColor="text-sage-deep"
      />
      <SummaryCard
        label="이번 달 지출"
        amount={expense}
        icon={TrendingDown}
        iconBg="bg-coral-soft"
        iconColor="text-coral"
        valueColor="text-coral"
      />
      <SummaryCard
        label="잔액"
        amount={balance}
        icon={Wallet}
        iconBg="bg-peach-soft"
        iconColor="text-peach-deep"
        valueColor="text-fg"
      />
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  amount: number;
  icon: ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  valueColor: string;
};

function SummaryCard({
  label,
  amount,
  icon: Icon,
  iconBg,
  iconColor,
  valueColor,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-md", iconBg)}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
        <span className="text-[13px] text-fg-soft">{label}</span>
      </div>
      <div className={cn("num text-[26px] font-bold tracking-tight", valueColor)}>
        {formatCurrency(amount)}
      </div>
    </div>
  );
}
