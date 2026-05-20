"use client";

import { useTransition } from "react";
import { deleteCategory } from "@/lib/actions/categories";
import { Button } from "../ui/button";

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
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isPending}>
      {isPending ? "삭제 중..." : "삭제"}
    </Button>
  );
}
