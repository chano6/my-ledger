import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { LoadMoreButton } from "@/components/transactions/load-more-button";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionList } from "@/components/transactions/transaction-list";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/queries/categories";
import { getTransactionCount, getTransactions } from "@/lib/queries/transactions";
import type { TransactionType } from "@/lib/types";

const PAGE_SIZE = 20;

type TransactionPageProps = {
  searchParams: Promise<{
    type?: string;
    category?: string;
    start?: string;
    end?: string;
    limit?: string;
    search?: string;
  }>;
};

async function TransactionsPage({ searchParams }: TransactionPageProps) {
  const params = await searchParams;

  const type: TransactionType | undefined =
    params.type === "income" || params.type === "expense" ? params.type : undefined;
  const categoryId = params.category;
  const startDate = params.start;
  const endDate = params.end;
  const search = params.search?.trim() || undefined;

  const limit = params.limit ? Number(params.limit) : PAGE_SIZE;
  const safeLimit = !Number.isNaN(limit) && limit > 0 ? limit : PAGE_SIZE;

  const filter = { type, categoryId, startDate, endDate, search };

  const [transactions, categories, totalCount] = await Promise.all([
    getTransactions({ ...filter, limit: safeLimit }),
    getCategories(),
    getTransactionCount(filter),
  ]);

  const hasMore = totalCount > transactions.length;

  return (
    <>
      <PageHeader
        title="거래 내역"
        description={`${transactions.length} / ${totalCount}건 표시`}
        action={
          <Button asChild>
            <Link href="/transactions/new">+ 새 거래</Link>
          </Button>
        }
      />

      <div className="mb-6 space-y-3">
        <TransactionFilters
          currentType={type}
          currentCategoryId={categoryId}
          currentStartDate={startDate}
          currentEndDate={endDate}
          currentSearch={search}
          categories={categories}
        />
      </div>

      {/* 거래 목록 */}
      <TransactionList transactions={transactions} />

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Suspense>
            <LoadMoreButton currentLimit={safeLimit} pageSize={PAGE_SIZE} />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default TransactionsPage;
