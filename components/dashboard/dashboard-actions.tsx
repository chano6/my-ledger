"use client";

import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { SearchEntry } from "../common/search-entry";
import { TransactionFormModal } from "../transactions/transaction-form-modal";
import { Button } from "../ui/button";

type DashboardActionsProps = {
  categories: Category[];
};

export function DashboardActions({ categories }: DashboardActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* 검색 */}
      <SearchEntry />

      {/* 월 선택 (일단 정적 버튼) */}
      <button
        type="button"
        className="flex h-10 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-bg-sunken"
      >
        <Calendar className="h-4 w-4 text-fg-soft" />
        <span>5월 2026</span>
      </button>

      {/* 거래 추가 */}
      <Button onClick={() => setModalOpen(true)} className="h-10 cursor-pointer">
        <Plus className="h-4 w-4" />
        거래 추가
      </Button>

      {/* 모달 */}
      <TransactionFormModal open={modalOpen} onOpenChange={setModalOpen} categories={categories} />
    </>
  );
}
