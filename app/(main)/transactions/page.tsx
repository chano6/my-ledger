import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { MobileAppBar } from "@/components/layout/mobile/app-bar";
import { LoadMoreButton } from "@/components/transactions/load-more-button";
import { FilterIconButton } from "@/components/transactions/mobile/filter-icon-button";
import { SearchActiveChip } from "@/components/transactions/mobile/search-active-chip";
import { TransactionsListMobile } from "@/components/transactions/mobile/transactions-list-mobile";
import { TransactionsStatsCompact } from "@/components/transactions/mobile/transactions-stats-compact";
import { TypeFilterMobile } from "@/components/transactions/mobile/type-filter-mobile";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionsActions } from "@/components/transactions/transactions-actions";
import { TransactionsStats } from "@/components/transactions/transactions-stats";
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

export const metadata: Metadata = {
  title: "거래 내역",
  description: "수입과 지출 거래를 검색하고 관리하세요.",
};

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await getCurrentProfile();
  const userEmail = user?.email ?? "";
  const userName = profile?.name ?? userEmail.split("@")[0] ?? "사용자";

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
      {/* 모바일 앱바 */}
      <MobileAppBar
        title="거래 내역"
        subTitle={description}
        userName={userName}
        userEmail={userEmail}
      />

      {/* 데스크탑 페이지 헤더 */}
      <PageHeader
        title="거래 내역"
        description={description}
        action={<TransactionsActions currentSearch={search} categories={categories} />}
      />

      {/* 모바일 */}
      <div className="space-y-3.5 px-4 py-4 lg:hidden">
        {/* 필터 영역: 세그먼티드 + 필터 아이콘 */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <TypeFilterMobile
              currentType={type}
              currentCategoryId={categoryId}
              currentStartDate={startDate}
              currentEndDate={endDate}
              currentSearch={search}
            />
          </div>
          <FilterIconButton />
        </div>

        {search && <SearchActiveChip search={search} />}

        {/* 통계 */}
        <TransactionsStatsCompact income={stats.income} expense={stats.expense} />

        {/* 거래 목록 (카드) */}
        <TransactionsListMobile transactions={transactions} categories={categories} />

        {hasMore && (
          <div className="mt-4 flex justify-center">
            <Suspense>
              <LoadMoreButton currentLimit={safeLimit} pageSize={PAGE_SIZE} />
            </Suspense>
          </div>
        )}
      </div>

      {/* 데스크탑 */}
      <div className="hidden space-y-5 px-4 py-6 lg:space-y-6 lg:px-8 lg:py-8 lg:block">
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
        <TransactionList transactions={transactions} categories={categories} />

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
