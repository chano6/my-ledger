"use client";

import { LayoutGrid, ListChecks, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "대시보드", icon: LayoutGrid },
  { href: "/transactions", label: "거래내역", icon: ListChecks },
  { href: "/categories", label: "카테고리", icon: Tag },
];

type SidebarContentProps = {
  userEmail: string;
  onNavigate?: () => void;
};

export function SidebarContent({ userEmail, onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const now = new Date();

  return (
    <div className="flex h-full flex-col">
      {/* 로고 */}
      <div className="flex items-center gap-2.5 px-6 pt-6 pb-5">
        <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-linear-to-br from-peach via-blush to-coral text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(220,140,100,0.25)]">
          L
        </div>
        <div>
          <div className="text-[17px] font-bold tracking-tight">
            ledger<span className="text-peach-deep">.</span>
          </div>
          <div className="text-[11px] text-fg-soft">
            {now.getFullYear()}년 {now.getMonth() + 1}월
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex flex-1 flex-col gap-1 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-peach-soft text-peach-deep"
                  : "text-fg-muted hover:bg-black/2.5 hover:text-fg",
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  className={cn(
                    "ml-auto rounded-full border px-1.5 py-0.5 text-[11px] font-semibold",
                    isActive
                      ? "border-transparent bg-white text-peach-deep"
                      : "border-border bg-card text-fg-muted",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 푸터: 유저 정보 */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-2.5 border-t border-border p-3">
          <div className="grid h-8.5 w-8.5 place-items-center rounded-full bg-linear-to-br from-butter to-peach text-[13px] font-bold text-[oklch(0.32_0.06_50)]">
            {userEmail[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-semibold">{userEmail.split("@")[0]}</div>
            <div className="truncate text-[11px] text-fg-soft">{userEmail}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
