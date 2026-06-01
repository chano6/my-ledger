"use client";

import { Download, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";

type TransactionsActionsProps = {
  currentSearch?: string;
};

export function TransactionsActions({ currentSearch }: TransactionsActionsProps) {
  return (
    <>
      {/* 검색 - 데스크탑만 */}
      <div className="hidden md:block">
        <SearchInput currentSearch={currentSearch} />
      </div>

      {/* 내보내기 - 데스크탑만 */}
      <button
        type="button"
        onClick={() => alert("내보내기 준비 중입니다.")}
        className="hidden h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-bg-sunken md:flex"
      >
        <Download className="h-4 w-4 text-fg-soft" />
        <span>내보내기</span>
      </button>

      {/* 거래 추가 - 데스크탑만 (모바일은 FAB) */}
      <Button asChild className="hidden h-10 md:flex">
        <Link href="/transactions/new">
          <Plus className="h-4 w-4" />
          거래 추가
        </Link>
      </Button>
    </>
  );
}
