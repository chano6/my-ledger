"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory } from "@/lib/actions/categories";
import { ConfirmDialog } from "../common/confirm-dialog";

type DeleteCategoryButtonProps = {
  id: string;
  name: string;
};

export function DeleteCategoryButton({ id, name }: DeleteCategoryButtonProps) {
  const handleDelete = async () => {
    try {
      await deleteCategory(id);
      toast.success(`"${name}" 카테고리를 삭제했어요`);
    } catch (error) {
      toast.error("카테고리 삭제에 실패했어요", {
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("카테고리 삭제 실패:", error);
    }
  };

  return (
    <ConfirmDialog
      trigger={
        <button
          type="button"
          className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-coral-soft hover:text-coral"
          aria-label="삭제"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      }
      title="카테고리 삭제"
      description={`"${name}" 카테고리를 삭제하시겠어요? 이 카테고리를 사용하던 거래는 "카테고리 없음"으로 표시됩니다.`}
      confirmText="삭제"
      cancelText="취소"
      destructive
      onConfirm={handleDelete}
    />
  );
}
