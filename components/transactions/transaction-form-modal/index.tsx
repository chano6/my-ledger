"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category, TransactionWithCategory } from "@/lib/types";
import { TransactionForm } from "./form";

type TransactionFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: TransactionWithCategory;
  categories: Category[];
};

export function TransactionFormModal({
  open,
  onOpenChange,
  transaction,
  categories,
}: TransactionFormModalProps) {
  const isEdit = !!transaction;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-5 sm:max-w-100">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-[18px] font-bold tracking-tight">
            {isEdit ? "거래 수정" : "거래 추가"}
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-fg-soft">
            {isEdit ? "거래 내용을 수정해주세요." : "새로운 수입 또는 지출을 기록해요."}
          </DialogDescription>
        </DialogHeader>

        <TransactionForm
          transaction={transaction}
          categories={categories}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
