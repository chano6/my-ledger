"use client";

import { Calendar, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function DashboardActions() {
  return (
    <>
      {/* 검색 */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-soft" />
        <input
          type="search"
          placeholder="거래 검색..."
          className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm placeholder:text-fg-soft focus:border-peach-deep focus:outline-none focus:ring-2 focus:ring-peach-deep/15 lg:w-65"
        />
      </div>

      {/* 월 선택 (일단 정적 버튼) */}
      <button
        type="button"
        className="flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-bg-sunken"
      >
        <Calendar className="h-4 w-4 text-fg-soft" />
        <span>5월 2026</span>
      </button>

      {/* 거래 추가 */}
      <Button asChild className="h-10">
        <Link href="/transactions/new">
          <Plus className="h-4 w-4" />
          거래 추가
        </Link>
      </Button>
    </>
  );
}
