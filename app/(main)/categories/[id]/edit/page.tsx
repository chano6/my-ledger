import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/categories/category-form";
import { PageHeader } from "@/components/ui/page-header";
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
      <PageHeader title="카테고리 수정" description="카테고리 정보를 수정하세요." />
      <CategoryForm action={updateCategory} defaultValues={category} submitLabel="수정" />
    </>
  );
}
