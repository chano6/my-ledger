import { TransactionForm } from "@/components/transactions/transaction-form";
import { getCategories } from "@/lib/queries/categories";

export default async function NewTransactionPage() {
  const categories = await getCategories();

  return (
    <>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">새 거래 추가</h1>
        <p className="mt-1 text-muted-foreground">수입 또는 지출 내역을 입력하세요.</p>
      </div>

      {/* 거래 입력 폼 */}
      <TransactionForm categories={categories} />
    </>
  );
}
