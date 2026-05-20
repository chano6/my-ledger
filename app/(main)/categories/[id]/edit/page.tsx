import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/categories/category-form";
import { updateCategory } from "@/lib/actions/categories";
import { getCategoryById } from "@/lib/queries/categories";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">카테고리 수정</h1>
        <p className="mt-1 text-muted-foreground">카테고리 정보를 수정하세요.</p>
      </div>

      <CategoryForm action={updateCategory} defaultValues={category} submitLabel="수정" />
    </>
  );
}
