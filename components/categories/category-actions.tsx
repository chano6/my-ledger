import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CategoriesActions() {
  return (
    <Button asChild className="h-10">
      <Link href="/categories/new">
        <Plus className="h-4 w-4" />
        카테고리 추가
      </Link>
    </Button>
  );
}
