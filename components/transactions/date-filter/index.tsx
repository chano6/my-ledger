"use client";

import { Calendar, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DATE_PRESETS } from "@/lib/constants";
import { formatShortDate } from "@/lib/format";
import { DateFilterCustom } from "./custom";
import { DateFilterPresets } from "./presets";

type DateFilterProps = {
  currentStartDate?: string;
  currentEndDate?: string;
};

export function DateFilter({ currentStartDate, currentEndDate }: DateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const label = formatDateRangeLabel(currentStartDate, currentEndDate);

  const applyDateRange = (start: string | undefined, end: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (start) {
      params.set("start", start);
    } else {
      params.delete("start");
    }

    if (end) {
      params.set("end", end);
    } else {
      params.delete("end");
    }

    params.delete("limit");

    const queryString = params.toString();
    router.push(`/transactions${queryString ? `?${queryString}` : ""}`);
    setOpen(false);
    setShowCustom(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex cursor-pointer h-7.5 items-center gap-1.5 rounded-[7px] border border-border bg-card px-2.5 text-[12.5px] font-semibold text-fg transition-colors hover:border-border-strong"
        >
          <Calendar className="h-3.5 w-3.5 text-fg-muted" />
          <span>{label}</span>
          <ChevronRight className="h-3 w-3 text-fg-muted" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-56 rounded-lg border-border p-1.5 shadow-lg">
        {!showCustom ? (
          <DateFilterPresets
            currentStart={currentStartDate}
            currentEnd={currentEndDate}
            onSelect={applyDateRange}
            onShowCustom={() => setShowCustom(true)}
          />
        ) : (
          <DateFilterCustom
            initialStart={currentStartDate}
            initialEnd={currentEndDate}
            onApply={applyDateRange}
            onBack={() => setShowCustom(false)}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

// 버튼에 표시할 라벨
function formatDateRangeLabel(start: string | undefined, end: string | undefined): string {
  if (!start && !end) return "기간 전체";

  // 프리셋 매칭 확인
  const matched = DATE_PRESETS.find((p) => {
    const range = p.getRange();
    return range.start === start && range.end === end;
  });

  if (matched) return matched.label;

  // 사용자 지정 형식: "5월 1일 – 5월 25일"
  if (start && end) {
    return `${formatShortDate(start)} - ${formatShortDate(end)}`;
  }

  if (start) return `${formatShortDate(start)} 이후`;
  if (end) return `${formatShortDate(end)} 이전`;

  return "기간 전체";
}
