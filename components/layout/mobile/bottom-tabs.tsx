"use client";

import { LayoutGrid, ListChecks, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "dashboard", label: "홈", icon: LayoutGrid, href: "/dashboard" },
  { id: "transactions", label: "거래", icon: ListChecks, href: "/transactions" },
  { id: "categories", label: "카테고리", icon: Tag, href: "/categories" },
];

export function MobileBottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-3 border-t border-border bg-card/85 px-0 py-2 backdrop-blur-md md:hidden">
      {TABS.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-peach-deep" : "text-fg-soft",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10.5px] font-semibold">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
