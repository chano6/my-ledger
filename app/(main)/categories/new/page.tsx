import { CategoryForm } from "@/components/categories/category-form";
import { PageHeader } from "@/components/ui/page-header";
import { createCategory } from "@/lib/actions/categories";

export default function NewCategoryPage() {
  return (
    <>
      <PageHeader title="새 카테고리" description="수입 또는 지출 카테고리를 추가하세요." />
      <CategoryForm action={createCategory} submitLabel="저장" />
    </>
  );
}
