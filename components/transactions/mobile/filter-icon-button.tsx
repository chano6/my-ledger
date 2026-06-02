"use client";

import { Filter } from "lucide-react";

export function FilterIconButton() {
  const handleClick = () => {
    // TODO: BottomSheet 열기 (Step 후속)
    alert("필터 시트는 곧 추가됩니다.");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[11px] border border-border bg-card text-fg-muted transition-colors hover:bg-bg-sunken"
      aria-label="필터"
    >
      <Filter className="h-4 w-4" />
    </button>
  );
}
