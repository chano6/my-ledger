"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CategoryFormModal } from "@/components/categories/category-form-modal";
import { TransactionFormModal } from "@/components/transactions/transaction-form-modal";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

type MobileFabProps = {
  categories: Category[];
};

export function MobileFab({ categories }: MobileFabProps) {
  const pathname = usePathname();

  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const isTransactionPage =
    pathname.startsWith("/dashboard") || pathname.startsWith("/transactions");

  const isCategoryPage = pathname.startsWith("/categories");

  // 표시 안 하는 경우
  if (!isTransactionPage && !isCategoryPage) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (isCategoryPage) {
            setCategoryModalOpen(true);
          } else {
            setTransactionModalOpen(true);
          }
        }}
        aria-label={isCategoryPage ? "카테고리 추가" : "거래 추가"}
        className={cn(
          "fixed bottom-19 right-4.5 z-30",
          "flex h-14 w-14 items-center justify-center",
          "rounded-[18px] bg-peach-deep text-white",
          "shadow-lg shadow-peach-deep/40",
          "transition-transform hover:scale-105 active:scale-95",
          "lg:hidden",
        )}
      >
        <Plus className="h-5.5 w-5.5" strokeWidth={2.5} />
      </button>

      <TransactionFormModal
        open={transactionModalOpen}
        onOpenChange={setTransactionModalOpen}
        categories={categories}
      />

      <CategoryFormModal open={categoryModalOpen} onOpenChange={setCategoryModalOpen} />
    </>
  );
}
