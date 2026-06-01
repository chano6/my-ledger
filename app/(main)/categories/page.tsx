import { CategoriesActions } from "@/components/categories/category-actions";
import { CategoryGroup } from "@/components/categories/category-group";
import { CategoryTypeFilter } from "@/components/categories/category-type-filter";
import { PageHeader } from "@/components/common/page-header";
import { getCategories } from "@/lib/queries/categories";
import type { TransactionType } from "@/lib/types";

type CategoriesPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const params = await searchParams;
  const typeFilter: TransactionType | undefined =
    params.type === "income" || params.type === "expense" ? params.type : undefined;

  const categories = await getCategories();
  const expenseCategories = categories.filter((c) => c.type === "expense");
  const incomeCategories = categories.filter((c) => c.type === "income");

  const filteredCategories =
    typeFilter === "income"
      ? incomeCategories
      : typeFilter === "expense"
        ? expenseCategories
        : null;

  return (
    <>
      <PageHeader
        title="카테고리"
        description="거래에 사용할 카테고리를 관리해요"
        action={<CategoriesActions />}
      />

      <div className="space-y-5 px-4 py-6 md:space-y-6 md:px-8 md:py-8">
        {/* 세그먼티드 필터 */}
        <CategoryTypeFilter
          totalCount={categories.length}
          expenseCount={expenseCategories.length}
          incomeCount={incomeCategories.length}
          currentType={typeFilter}
        />

        {/* 카테고리 목록 */}
        {filteredCategories === null ? (
          // 전체 보기: 지출 + 수입 그룹 둘 다
          <>
            <CategoryGroup
              title="지출"
              count={expenseCategories.length}
              categories={expenseCategories}
            />
            <CategoryGroup
              title="수입"
              count={incomeCategories.length}
              categories={incomeCategories}
            />
          </>
        ) : (
          // 필터 적용: 한 그룹만
          <CategoryGroup
            title={typeFilter === "income" ? "수입" : "지출"}
            count={filteredCategories.length}
            categories={filteredCategories}
          />
        )}
      </div>
    </>
  );
}
