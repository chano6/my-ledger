"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentMonthRange, getCurrentYearRange, getLastMonthRange } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type DateFilterProps = {
  currentStartDate?: string;
  currentEndDate?: string;
};

type Preset = "all" | "thisMonth" | "lastMonth" | "thisYear";

export function DateFilter({ currentStartDate, currentEndDate }: DateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPreset = detectPreset(currentStartDate, currentEndDate);

  const setDateRange = (start: string | undefined, end: string | undefined) => {
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

    const queryString = params.toString();
    router.push(`/transactions${queryString ? `?${queryString}` : ""}`);
  };

  const handlePresetClick = (preset: Preset) => {
    if (preset === "all") {
      setDateRange(undefined, undefined);
      return;
    }

    let range: { start: string; end: string };

    if (preset === "thisMonth") {
      range = getCurrentMonthRange();
    } else if (preset === "lastMonth") {
      range = getLastMonthRange();
    } else {
      range = getCurrentYearRange();
    }

    setDateRange(range.start, range.end);
  };

  const handleStartChange = (value: string) => {
    setDateRange(value || undefined, currentEndDate);
  };

  const handleEndChange = (value: string) => {
    setDateRange(currentStartDate, value || undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 빠른 선택 버튼들 */}
      <div className="flex gap-2">
        <PresetButton active={currentPreset === "all"} onClick={() => handlePresetClick("all")}>
          전체 기간
        </PresetButton>
        <PresetButton
          active={currentPreset === "thisMonth"}
          onClick={() => handlePresetClick("thisMonth")}
        >
          이번 달
        </PresetButton>
        <PresetButton
          active={currentPreset === "lastMonth"}
          onClick={() => handlePresetClick("lastMonth")}
        >
          지난 달
        </PresetButton>
        <PresetButton
          active={currentPreset === "thisYear"}
          onClick={() => handlePresetClick("thisYear")}
        >
          올해
        </PresetButton>
      </div>

      {/* 사용자 지정 */}
      <div className="flex items-center gap-2">
        <Input
          type="date"
          value={currentStartDate ?? ""}
          onChange={(e) => handleStartChange(e.target.value)}
          className="w-37.5"
        />
        <span className="text-muted-foreground">~</span>
        <Input
          type="date"
          value={currentEndDate ?? ""}
          onChange={(e) => handleEndChange(e.target.value)}
          className="w-37.5"
        />
      </div>
    </div>
  );
}

// 현재 날짜 범위가 어떤 프리셋인지 판별
function detectPreset(start: string | undefined, end: string | undefined): Preset {
  if (!start && !end) return "all";

  const thisMonth = getCurrentMonthRange();
  if (start === thisMonth.start && end === thisMonth.end) return "thisMonth";

  const lastMonth = getLastMonthRange();
  if (start === lastMonth.start && end === lastMonth.end) return "lastMonth";

  const thisYear = getCurrentYearRange();
  if (start === thisYear.start && end === thisYear.end) return "thisYear";

  return "all"; // 사용자 지정 등
}

function PresetButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4",
        active
          ? "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background"
          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
      )}
    >
      {children}
    </Button>
  );
}
