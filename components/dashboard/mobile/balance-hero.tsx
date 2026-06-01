import { TrendingDown, TrendingUp } from "lucide-react";
import type { ComponentType } from "react";
import { formatCurrency } from "@/lib/format";

type BalanceHeroProps = {
  income: number;
  expense: number;
};

export function BalanceHero({ income, expense }: BalanceHeroProps) {
  const balance = income - expense;

  return (
    <div
      className="relative overflow-hidden rounded-xl p-5 text-white shadow-lg shadow-peach-deep/20"
      style={{
        backgroundImage: `
          radial-gradient(circle at 85% 10%, rgba(255, 220, 150, 0.4), transparent 50%),
          linear-gradient(155deg, oklch(0.62 0.13 70), oklch(0.46 0.10 55))
        `,
      }}
    >
      {/* 라벨 */}
      <div className="text-[12.5px] font-medium text-white/80">이번 달 잔액</div>

      {/* 잔액 */}
      <div className="num mt-1 text-[32px] font-bold tracking-tight">{formatCurrency(balance)}</div>

      {/* 하단 통계 */}
      <div className="mt-4 flex items-center gap-3">
        {/* 수입 */}
        <HeroStat label="수입" amount={income} icon={TrendingUp} />

        {/* 구분선 */}
        <div className="h-7.5 w-px bg-white/22" />

        {/* 지출 */}
        <HeroStat label="지출" amount={expense} icon={TrendingDown} />
      </div>
    </div>
  );
}

function HeroStat({
  label,
  amount,
  icon: Icon,
}: {
  label: string;
  amount: number;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-1 items-center gap-2.5">
      <div className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-white/18">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-white/75">{label}</span>
        <span className="num text-[13.5px] font-bold">{formatCurrency(amount)}</span>
      </div>
    </div>
  );
}
