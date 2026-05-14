"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/lib/actions/transactions";

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("정말 이 거래를 삭제하시겠어요?")) {
      return;
    }

    startTransition(async () => {
      await deleteTransaction(id);
    });
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isPending}>
      {isPending ? "삭제 중..." : "삭제"}
    </Button>
  );
}
