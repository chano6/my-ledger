import Link from "next/link";
import { DeleteCategoryButton } from "@/components/categories/delete-category-button";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/queries/categories";
import type { Category } from "@/lib/types";

export default async function CategoriesPage() {
  const categories = await getCategories();

  const expenseCategories = categories.filter((c) => c.type === "expense");
  const incomeCategories = categories.filter((c) => c.type === "income");

  return (
    <>
      <PageHeader
        title="카테고리"
        description={`전체 ${categories.length}개의 카테고리`}
        action={
          <Button asChild>
            <Link href="/categories/new">+ 새 카테고리</Link>
          </Button>
        }
      />

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">지출 카테고리</h2>
        <CategorySection categories={expenseCategories} />
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">수입 카테고리</h2>
        <CategorySection categories={incomeCategories} />
      </section>
    </>
  );
}

function CategorySection({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return <EmptyState message="아직 카테고리가 없습니다." />;
  }

  return (
    <div className="rounded-lg border">
      <div className="px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="font-medium">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/categories/${category.id}/edit`}>수정</Link>
              </Button>
              <DeleteCategoryButton id={category.id} name={category.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
