import { Search } from "lucide-react";

type MobileAppBarProps = {
  title: string;
  subTitle?: string;
};

export function MobileAppBar({ title, subTitle }: MobileAppBarProps) {
  return (
    <div className="flex items-center gap-3 px-5 pb-3.5 pt-2 md:hidden">
      <div className="min-w-0 flex-1">
        <h1 className="text-[22px] font-bold tracking-[-0.02em] text-fg">{title}</h1>
        {subTitle && <p className="mt-0.5 text-[12px] text-fg-soft truncate">{subTitle}</p>}
      </div>

      {/* 검색 버튼 */}
      <button
        type="button"
        className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[11px] bg-bg-sunken text-fg-muted transition-colors hover:bg-border"
        aria-label="검색"
      >
        <Search className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}
