import { cn } from "@/lib/utils";

type AmountInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AmountInput({ value, onChange }: AmountInputProps) {
  // 숫자만 허용 + 천 단위 콤마 표시
  const formatted = value ? Number(value).toLocaleString("ko-KR") : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 콤마, 숫자 외 제거
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange(raw);
  };

  return (
    <div className="relative">
      {/* 좌측 ₩ 기호 */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[20px] font-semibold text-fg-muted">
        ₩
      </span>

      {/* input */}
      <input
        type="text"
        inputMode="numeric"
        value={formatted}
        onChange={handleChange}
        placeholder="0"
        className={cn(
          "h-14 w-full rounded-lg border border-border bg-card pl-10 pr-14",
          "text-[22px] font-bold tracking-tight text-fg",
          "placeholder:text-fg-soft",
          "focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/20",
        )}
      />

      {/* 우측 KRW */}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-fg-soft">
        KRW
      </span>
    </div>
  );
}
