"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteCategory } from "@/lib/actions/categories";

type DeleteCategoryButtonProps = {
  id: string;
  name: string;
};

export function DeleteCategoryButton({ id, name }: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const message = `"${name}" 카테고리를 삭제하시겠어요?\n\n이 카테고리를 사용하던 거래는 "카테고리 없음"으로 표시됩니다.`;
    if (!confirm(message)) {
      return;
    }

    startTransition(async () => {
      await deleteCategory(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-md text-fg-soft transition-colors hover:bg-coral-soft hover:text-coral disabled:opacity-50"
      aria-label="삭제"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
