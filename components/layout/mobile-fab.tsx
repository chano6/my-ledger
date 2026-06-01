"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileFab() {
  const pathname = usePathname();

  let href: string | null = null;
  let label = "";

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/transactions")) {
    href = "/transactions/new";
    label = "거래 추가";
  } else if (pathname.startsWith("/categories")) {
    href = "/categories/new";
    label = "카테고리 추가";
  }

  if (!href) return null;

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "fixed bottom-19 right-4.5 z-30",
        "flex h-14 w-14 items-center justify-center",
        "rounded-[18px] bg-peach-deep text-white",
        "shadow-lg shadow-peach-deep/40",
        "transition-transform hover:scale-105 active:scale-95",
        "md:hidden",
      )}
    >
      <Plus className="h-5 w-5" strokeWidth={2.5} />
    </Link>
  );
}
