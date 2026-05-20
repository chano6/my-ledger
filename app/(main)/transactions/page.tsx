import Link from "next/link";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionList } from "@/components/transactions/transaction-list";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/queries/categories";
import { getTransactions } from "@/lib/queries/transactions";

type TransactionPageProps = {
  searchParams: Promise<{ type?: string; category?: string; start?: string; end?: string }>;
};

async function TransactionsPage({ searchParams }: TransactionPageProps) {
  const params = await searchParams;

  const type = params.type === "income" || params.type === "expense" ? params.type : undefined;
  const categoryId = params.category;
  const startDate = params.start;
  const endDate = params.end;

  const [transactions, categories] = await Promise.all([
    getTransactions({ type, categoryId, startDate, endDate }),
    getCategories(),
  ]);

  return (
    <>
      {/* 헤더 + 추가 버튼 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">거래 내역</h1>
          <p className="mt-1 text-muted-foreground">전체 {transactions.length}건의 거래</p>
        </div>
        <Button asChild>
          <Link href="/transactions/new">+ 새 거래</Link>
        </Button>
      </div>

      <div className="mb-6 space-y-3">
        <TransactionFilters
          currentType={type}
          currentCategoryId={categoryId}
          currentStartDate={startDate}
          currentEndDate={endDate}
          categories={categories}
        />
      </div>

      {/* 거래 목록 */}
      <TransactionList transactions={transactions} />
    </>
  );
}

export default TransactionsPage;
