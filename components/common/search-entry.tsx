"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type SearchEntryProps = {
  placeholder?: string;
  inputClassName?: string;
  onSubmitted?: () => void;
};

export function SearchEntry({
  placeholder = "거래 검색...",
  inputClassName,
  onSubmitted,
}: SearchEntryProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/transactions?search=${encodeURIComponent(trimmed)}` : "/transactions");
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-soft" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm placeholder:text-fg-soft focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/15",
          inputClassName,
        )}
      />
    </form>
  );
}
