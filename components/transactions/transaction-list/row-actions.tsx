"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTransaction } from "@/lib/actions/transactions";
import type { Category, TransactionWithCategory } from "@/lib/types";
import { TransactionFormModal } from "../transaction-form-modal";

type TransactionRowActionsProps = {
  transaction: TransactionWithCategory;
  categories: Category[];
};

export function TransactionRowActions({ transaction, categories }: TransactionRowActionsProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaction.id);
      toast.success("거래를 삭제했어요");
    } catch (error) {
      toast.error("거래 삭제에 실패했어요", {
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("거래 삭제 실패:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-bg-sunken hover:text-fg"
            aria-label="거래 메뉴"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={() => setEditModalOpen(true)} className="cursor-pointer">
            <Pencil className="mr-2 h-3.5 w-3.5" />
            <span>수정</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <ConfirmDialog
            trigger={
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="cursor-pointer text-coral focus:bg-coral-soft focus:text-coral"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                <span>삭제</span>
              </DropdownMenuItem>
            }
            title="거래 삭제"
            description="이 거래를 삭제하시겠어요? 삭제된 거래는 복구할 수 없어요."
            confirmText="삭제"
            destructive
            onConfirm={handleDelete}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <TransactionFormModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        transaction={transaction}
        categories={categories}
      />
    </>
  );
}
