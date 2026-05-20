import { TransactionForm } from "@/components/transactions/transaction-form";
import { PageHeader } from "@/components/ui/page-header";
import { createTransaction } from "@/lib/actions/transactions";
import { getCategories } from "@/lib/queries/categories";

export default async function NewTransactionPage() {
  const categories = await getCategories();

  return (
    <>
      <PageHeader title="새 거래 추가" description="수입 또는 지출 내역을 입력하세요." />
      <TransactionForm categories={categories} action={createTransaction} submitLabel="저장" />
    </>
  );
}
