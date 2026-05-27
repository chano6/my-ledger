"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

type DateFilterProps = {
  currentStartDate?: string;
  currentEndDate?: string;
};

export function DateFilter({ currentStartDate, currentEndDate }: DateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const handleStartChange = (value: string) => {
    setDateRange(value || undefined, currentEndDate);
  };

  const handleEndChange = (value: string) => {
    setDateRange(currentStartDate, value || undefined);
  };

  return (
    <div className="flex items-center gap-3">
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
