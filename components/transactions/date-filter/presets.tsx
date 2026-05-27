"use client";

import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { DATE_PRESETS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type DateFilterPresetsProps = {
  currentStart?: string;
  currentEnd?: string;
  onSelect: (start: string | undefined, end: string | undefined) => void;
  onShowCustom: () => void;
};

export function DateFilterPresets({
  currentStart,
  currentEnd,
  onSelect,
  onShowCustom,
}: DateFilterPresetsProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {/* 전체 (필터 해제) */}
      <PresetButton
        onClick={() => onSelect(undefined, undefined)}
        active={!currentStart && !currentEnd}
      >
        전체
      </PresetButton>

      <div className="my-1 h-px bg-border" />

      {/* 프리셋들 */}
      {DATE_PRESETS.map((preset) => {
        const range = preset.getRange();
        return (
          <PresetButton
            key={preset.label}
            onClick={() => onSelect(range.start, range.end)}
            active={currentStart === range.start && currentEnd === range.end}
          >
            {preset.label}
          </PresetButton>
        );
      })}

      <div className="my-1 h-px bg-border" />

      {/* 사용자 지정 */}
      <button
        type="button"
        onClick={onShowCustom}
        className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[13px] text-fg transition-colors hover:bg-bg-sunken"
      >
        <span>사용자 지정</span>
        <ChevronRight className="h-3 w-3 text-fg-muted" />
      </button>
    </div>
  );
}

function PresetButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors",
        active ? "bg-peach-soft font-semibold text-peach-deep" : "text-fg hover:bg-bg-sunken",
      )}
    >
      {children}
    </button>
  );
}
