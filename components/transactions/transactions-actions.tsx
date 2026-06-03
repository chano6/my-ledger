"use client";

import { Download, Plus } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import { TransactionFormModal } from "./transaction-form-modal";

type TransactionsActionsProps = {
  currentSearch?: string;
  categories: Category[];
};

export function TransactionsActions({ currentSearch, categories }: TransactionsActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* 검색 - 데스크탑만 */}
      <div className="hidden lg:block">
        <SearchInput currentSearch={currentSearch} />
      </div>

      {/* 내보내기 - 데스크탑만 */}
      <button
        type="button"
        onClick={() => alert("내보내기 준비 중입니다.")}
        className="hidden h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-bg-sunken lg:flex"
      >
        <Download className="h-4 w-4 text-fg-soft" />
        <span>내보내기</span>
      </button>

      {/* 거래 추가 - 데스크탑만 (모바일은 FAB) */}
      <Button onClick={() => setModalOpen(true)} className="hidden h-10 lg:flex cursor-pointer">
        <Plus className="h-4 w-4" />
        거래 추가
      </Button>

      {/* 모달 */}
      <TransactionFormModal open={modalOpen} onOpenChange={setModalOpen} categories={categories} />
    </>
  );
}
