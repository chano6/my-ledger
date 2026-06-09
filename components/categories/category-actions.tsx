"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryFormModal } from "./category-form-modal";

export function CategoriesActions() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setModalOpen(true)} className="hidden h-10 cursor-pointer lg:flex">
        <Plus className="h-4 w-4" />
        카테고리 추가
      </Button>

      <CategoryFormModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
