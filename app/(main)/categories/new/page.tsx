import { CategoryForm } from "@/components/categories/category-form";
import { createCategory } from "@/lib/actions/categories";

export default function NewCategoryPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">새 카테고리</h1>
        <p className="mt-1 text-muted-foreground">수입 또는 지출 카테고리를 추가하세요.</p>
      </div>
      <CategoryForm action={createCategory} submitLabel="저장" />
    </>
  );
}
