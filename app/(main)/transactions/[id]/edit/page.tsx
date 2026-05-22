import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { updateTransaction } from "@/lib/actions/transactions";
import { getCategories } from "@/lib/queries/categories";
import { getTransactionById } from "@/lib/queries/transactions";

type EditTransactionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTransactionPage({ params }: EditTransactionPageProps) {
  const { id } = await params;

  const [transaction, categories] = await Promise.all([getTransactionById(id), getCategories()]);

  if (!transaction) {
    notFound();
  }

  return (
    <>
      <PageHeader title="거래 수정" description="거래 내용을 수정하세요." />
      <TransactionForm
        categories={categories}
        action={updateTransaction}
        defaultValues={transaction}
        submitLabel="수정"
      />
    </>
  );
}
