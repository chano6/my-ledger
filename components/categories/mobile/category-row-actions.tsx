"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCategory } from "@/lib/actions/categories";

type CategoryRowActionsProps = {
  categoryId: string;
  categoryName: string;
};

export function CategoryRowActions({ categoryId, categoryName }: CategoryRowActionsProps) {
  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId);
      toast.success(`"${categoryName}" 카테고리를 삭제했어요`);
    } catch (error) {
      toast.error("카테고리 삭제에 실패했어요", {
        description: "잠시 후 다시 시도해주세요.",
      });
      console.error("카테고리 삭제 실패:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-bg-sunken hover:text-fg"
          aria-label="카테고리 메뉴"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem asChild>
          <Link href={`/categories/${categoryId}/edit`} className="cursor-pointer">
            <Pencil className="mr-2 h-3.5 w-3.5" />
            <span>수정</span>
          </Link>
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
          title="카테고리 삭제"
          description={`"${categoryName}" 카테고리를 삭제하시겠어요? 이 카테고리를 사용하던 거래는 "카테고리 없음"으로 표시됩니다.`}
          confirmText="삭제"
          destructive
          onConfirm={handleDelete}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
