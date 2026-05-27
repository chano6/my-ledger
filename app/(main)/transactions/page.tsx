import { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { LoadMoreButton } from "@/components/transactions/load-more-button";
import { TransactionsStats } from "@/components/transactions/stats/transactions-stats";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionsActions } from "@/components/transactions/transactions-actions";
import { formatDateRangeLabel } from "@/lib/format";
import { getCategories } from "@/lib/queries/categories";
import { getCurrentProfile } from "@/lib/queries/profile";
import {
  getTransactionCount,
  getTransactions,
  getTransactionsStats,
} from "@/lib/queries/transactions";
import { createClient } from "@/lib/supabase/server";
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = await getCurrentProfile();
  const userEmail = user?.email ?? "";
  const userName = profile?.name ?? userEmail.split("@")[0];

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

  const [transactions, categories, totalCount, stats] = await Promise.all([
    getTransactions({ ...filter, limit: safeLimit }),
    getCategories(),
    getTransactionCount(filter),
    getTransactionsStats(filter),
  ]);

  // 이번 달 지출
  const description = `총 ${totalCount}건`;

  const hasMore = totalCount > transactions.length;

  const filterRangeLabel = formatDateRangeLabel(startDate, endDate);

  return (
    <>
      <PageHeader
        title="거래 내역"
        description={description}
        action={<TransactionsActions currentSearch={search} />}
        userName={userName}
        userEmail={userEmail}
      />

      <div className="space-y-5 px-4 py-6 md:space-y-6 md:px-8 md:py-8">
        <div className="space-y-3">
          <TransactionFilters
            currentType={type}
            currentCategoryId={categoryId}
            currentStartDate={startDate}
            currentEndDate={endDate}
            currentSearch={search}
            categories={categories}
          />
        </div>

        {/* 통계 카드 */}
        <TransactionsStats
          income={stats.income}
          expense={stats.expense}
          filterRangeLabel={filterRangeLabel}
        />

        {/* 거래 목록 */}
        <TransactionList transactions={transactions} />

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <Suspense>
              <LoadMoreButton currentLimit={safeLimit} pageSize={PAGE_SIZE} />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
}

export default TransactionsPage;
