"use client";

import { useState } from "react";

type DateFilterCustomProps = {
  initialStart?: string;
  initialEnd?: string;
  onApply: (start: string | undefined, end: string | undefined) => void;
  onBack: () => void;
};

export function DateFilterCustom({
  initialStart,
  initialEnd,
  onApply,
  onBack,
}: DateFilterCustomProps) {
  const [start, setStart] = useState(initialStart ?? "");
  const [end, setEnd] = useState(initialEnd ?? "");

  return (
    <div className="flex flex-col gap-2 p-1">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 self-start text-[12px] text-fg-muted hover:text-fg"
      >
        ← 프리셋으로
      </button>

      <div className="space-y-2">
        <div className="space-y-1">
          <label htmlFor="date-start" className="text-[11px] font-medium text-fg-muted">시작일</label>
          <input
            id="date-start"
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="h-9 w-full rounded-sm border border-border bg-card px-2 text-[13px]"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="date-end" className="text-[11px] font-medium text-fg-muted">종료일</label>
          <input
            id="date-end"
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="h-9 w-full rounded-sm border border-border bg-card px-2 text-[13px]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onApply(start || undefined, end || undefined)}
        className="mt-1 h-8 rounded-sm bg-peach-deep text-[12.5px] font-semibold text-white transition-colors hover:opacity-90"
      >
        적용
      </button>
    </div>
  );
}
