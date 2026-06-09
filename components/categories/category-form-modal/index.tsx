"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Category } from "@/lib/types";
import { CategoryForm } from "./form";

type CategoryFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
};

export function CategoryFormModal({ open, onOpenChange, category }: CategoryFormModalProps) {
  const isEdit = !!category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-5 sm:max-w-105">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-[18px] font-bold tracking-tight">
            {isEdit ? "카테고리 수정" : "카테고리 추가"}
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-fg-soft">
            {isEdit
              ? "카테고리 정보를 수정해주세요."
              : "색상과 아이콘을 골라 새 카테고리를 만들어요."}
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          category={category}
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
