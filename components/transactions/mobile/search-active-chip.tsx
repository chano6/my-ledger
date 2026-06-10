"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type SearchActiveChipProps = {
  search: string;
};

export function SearchActiveChip({ search }: SearchActiveChipProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("limit");

    const queryString = params.toString();
    router.push(`/transactions${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
      <Search className="h-3.5 w-3.5 shrink-0 text-fg-soft" />
      <span className="min-w-0 flex-1 truncate text-[13px] text-fg">
        <span className="font-semibold">{search}</span>
        <span className="text-fg-soft"> 검색 중</span>
      </span>
      <button
        type="button"
        onClick={handleClear}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-bg-sunken hover:text-fg"
        aria-label="검색 해제"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
