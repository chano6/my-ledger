import { formatCurrency } from "@/lib/format";

type AuthSidePanelProps = {
  side?: "left" | "right";
};

export function AuthSidePanel({ side = "left" }: AuthSidePanelProps) {
  return (
    <div
      className={`relative hidden flex-col justify-between overflow-hidden p-10 md:flex ${
        side === "left" ? "md:order-first" : "md:order-last"
      }`}
      style={{
        background: `linear-gradient(135deg, 
          oklch(0.85 0.060 80) 0%, 
          oklch(0.55 0.090 60) 50%,
          oklch(0.42 0.070 50) 100%)`,
      }}
    >
      {/* 로고 */}
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/95 text-[15px] font-bold text-peach-deep shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
          L
        </div>
        <div className="text-[17px] font-bold tracking-tight text-white">
          ledger<span className="text-butter">.</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
            오늘 쓴 한 잔의 커피도,
            <br />한 줄로 남기면 자산이 돼요.
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            카테고리별 지출 패턴부터 월간 흐름까지 — ledger가 따뜻한 한 페이지에 모아 드려요.
          </p>
        </div>

        {/* 거래 미리보기 카드 */}
        <div className="rounded-2xl border border-white/30 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-butter-soft text-[15px]">
              ☕
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold">스타벅스 강남점</div>
              <div className="text-[11px] text-fg-soft">식비 · 오늘</div>
            </div>
            <div className="text-[13px] font-bold text-expense">-{formatCurrency(6800)}</div>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage-soft text-[15px]">
              💰
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold">월급</div>
              <div className="text-[11px] text-fg-soft">급여 · 5월 25일</div>
            </div>
            <div className="text-[13px] font-bold text-income">+{formatCurrency(3200000)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
