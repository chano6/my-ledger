import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Variant } from "@/lib/types";
import { cn } from "@/lib/utils";

// variant별 스타일 정의
const VARIANT_STYLES: Record<
  Variant,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconBg: string;
    iconColor: string;
    amountColor: string;
    badgeBg: string;
  }
> = {
  income: {
    icon: TrendingUp,
    iconBg: "bg-sage-soft",
    iconColor: "text-sage-deep",
    amountColor: "text-income",
    badgeBg: "bg-sage-soft text-sage-deep",
  },
  expense: {
    icon: TrendingDown,
    iconBg: "bg-coral-soft",
    iconColor: "text-coral",
    amountColor: "text-coral",
    badgeBg: "bg-coral-soft text-coral",
  },
  balance: {
    icon: Wallet,
    iconBg: "bg-peach-soft",
    iconColor: "text-peach-deep",
    amountColor: "", // 동적 결정 (양수/음수)
    badgeBg: "bg-bg-sunken text-fg-muted",
  },
};

type TransactionsStatsCardProps = {
  variant: Variant;
  label: string;
  amount: number;
  sign: string;
  badgeText: string;
  amountColorOverride?: string; // balance용 (양수/음수)
};

export function TransactionsStatsCard({
  variant,
  label,
  amount,
  sign,
  badgeText,
  amountColorOverride,
}: TransactionsStatsCardProps) {
  const style = VARIANT_STYLES[variant];
  const Icon = style.icon;
  const amountColor = amountColorOverride || style.amountColor;

  return (
    <div className="rounded-lg border border-border bg-card px-4.5 pt-4.5 pb-4 shadow-sm">
      {/* 라벨 + 아이콘 */}
      <div className="mb-3 flex items-center gap-2">
        <div
          className={cn("flex h-6.5 w-6.5 items-center justify-center rounded-sm", style.iconBg)}
        >
          <Icon className={cn("h-3.5 w-3.5", style.iconColor)} />
        </div>
        <span className="text-[12.5px] font-medium text-fg-muted">{label}</span>
      </div>

      {/* 금액 */}
      <div className={cn("num mb-3 text-[28px] font-bold tracking-tight", amountColor)}>
        {sign}
        {formatCurrency(Math.abs(amount))}
      </div>

      {/* 뱃지 */}
      <div
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[12px] font-semibold",
          style.badgeBg,
        )}
      >
        {badgeText}
      </div>
    </div>
  );
}
