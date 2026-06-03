"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toDateString } from "@/lib/format";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const date = new Date(value);

  // 표시 형식: "2026.05.25 (월)"
  const displayLabel = format(date, "yyyy.MM.dd (E)", { locale: ko });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex cursor-pointer h-11 w-full items-center justify-between rounded-lg border border-border bg-card px-3 text-left text-[14px] font-medium text-fg transition-colors",
            "hover:border-border-strong",
            "focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/20",
          )}
        >
          <span>{displayLabel}</span>
          <CalendarIcon className="h-4 w-4 text-fg-soft" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              onChange(toDateString(d));
              setOpen(false);
            }
          }}
          locale={ko}
          required
        />
      </PopoverContent>
    </Popover>
  );
}
